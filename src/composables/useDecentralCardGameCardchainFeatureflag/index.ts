/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useDecentralCardGameCardchainFeatureflag() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.DecentralCardGameCardchainFeatureflag.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryQFlag = (module: string, name: string,  options: any) => {
    const key = { type: 'QueryQFlag',  module,  name };    
    return useQuery([key], () => {
      const { module,  name } = key
      return  client.DecentralCardGameCardchainFeatureflag.query.queryQFlag(module, name).then( res => res.data );
    }, options);
  }
  
  const QueryQFlags = ( options: any) => {
    const key = { type: 'QueryQFlags',  };    
    return useQuery([key], () => {
      return  client.DecentralCardGameCardchainFeatureflag.query.queryQFlags().then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QueryQFlag,QueryQFlags,
  }
}