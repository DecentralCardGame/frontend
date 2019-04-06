import { mount } from '@vue/test-utils'
import CardComponent from '@/components/CardComponent'

describe('CardComponent', () => {
  const wrapper = mount(CardComponent)

  it('has an image', () => {
    expect(wrapper.contains('img')).toBe(true)
  })

  it('points to a placeholder image', () => {
    expect(wrapper.find('img').attributes('src'))
      .toBe('https://via.placeholder.com/200x300/000000/FFFFFF/?text=CARD-PLACEHOLDER')
  })
})
