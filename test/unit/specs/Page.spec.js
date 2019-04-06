import { mount } from '@vue/test-utils'
import AboutPage from '@/components/pages/AboutPage'
import GalleryPage from '@/components/pages/GalleryPage'
import LandingPage from '@/components/pages/LandingPage'
import LoginPage from '@/components/pages/LoginPage'

describe('AboutPage', () => {
  const wrapper = mount(AboutPage)

  it('works', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})

describe('GalleryPage', () => {
  const wrapper = mount(GalleryPage)

  it('works', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})

describe('LandingPage', () => {
  const wrapper = mount(LandingPage)

  it('works', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})

describe('LoginPage', () => {
  const wrapper = mount(LoginPage)

  it('works', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
