// Run from the pinned Cardchain checkout:
// go run /path/to/frontend/scripts/verify-current-tx-fixtures.go /path/to/fixtures.json
package main

import (
 "encoding/base64"
 "encoding/json"
 "fmt"
 "os"
 "reflect"

 "github.com/DecentralCardGame/cardchain/x/cardchain/types"
 "github.com/cosmos/cosmos-sdk/codec"
 codectypes "github.com/cosmos/cosmos-sdk/codec/types"
 sdk "github.com/cosmos/cosmos-sdk/types"
)

func main() {
 raw, err := os.ReadFile(os.Args[1]); must(err)
 var fixtures []struct { Name string `json:"name"`; TypeURL string `json:"typeUrl"`; Bytes string `json:"bytes"`; Decoded map[string]any `json:"decoded"` }
 must(json.Unmarshal(raw,&fixtures))
 registry := codectypes.NewInterfaceRegistry()
 types.RegisterInterfaces(registry)
 cdc := codec.NewProtoCodec(registry)
 for _, f := range fixtures {
  wire, err := base64.StdEncoding.DecodeString(f.Bytes); must(err)
  var msg sdk.Msg
  must(cdc.UnpackAny(&codectypes.Any{TypeUrl:f.TypeURL,Value:wire}, &msg))
  encoded, err := cdc.Marshal(msg); must(err)
  var roundtripped sdk.Msg
  must(cdc.UnpackAny(&codectypes.Any{TypeUrl:f.TypeURL,Value:encoded}, &roundtripped))
  if !reflect.DeepEqual(msg,roundtripped) { panic("semantic roundtrip mismatch: "+f.Name) }
  raw, err := cdc.MarshalJSON(msg); must(err)
  var actual map[string]any
  must(json.Unmarshal(raw,&actual))
  for key, want := range f.Decoded {
   if !reflect.DeepEqual(actual[key],want) { panic(fmt.Sprintf("%s.%s: got %#v, want %#v",f.Name,key,actual[key],want)) }
  }
 }
 fmt.Printf("PASS: %d frontend messages independently decoded and re-encoded by the current Go SDK registry; fields match.\n",len(fixtures))
}
func must(err error) { if err != nil { panic(err) } }
