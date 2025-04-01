import { promises as fs } from 'fs'
import { defineConfig, tierPresets } from 'sponsorkit'

import type { BadgePreset } from 'sponsorkit'

const presetPast = {
  avatar: {
    size: 20
  },
  boxWidth: 22,
  boxHeight: 22,
  container: {
    sidePadding: 35
  }
} satisfies BadgePreset

const presetGold = {
  avatar: {
    size: 110
  },
  boxWidth: 150,
  boxHeight: 150,
  container: {
    sidePadding: 60
  },
  name: {
    maxLength: 40
  }
} satisfies BadgePreset

const presetPlatinum = {
  avatar: {
    size: 130
  },
  boxWidth: 170,
  boxHeight: 170,
  container: {
    sidePadding: 60
  },
  name: {
    maxLength: 50
  }
} satisfies BadgePreset

const presetSpecial = presetPlatinum

// const PLAID_LOGO = (width: number, y: number) =>
//     `<svg xmlns="http://www.w3.org/2000/svg" x="${(width - 163.5) / 2}" y="${y}" width="163.5" height="36" viewBox="0 0 163.5 36"><defs><style>.cls-1{fill:#181616;}.cls-2{fill:#9a1e23;}.cls-3{fill:#c0364d;}.cls-4{fill:#7c181d;}.cls-5{fill:#641014;}</style></defs><title>plaid_yoko</title><g id="レイヤー_2" data-name="レイヤー 2"><g id="plaid_yoko"><g id="plaid_yoko-2" data-name="plaid_yoko"><path id="P" class="cls-1" d="M59.9,5.968H48v24h6v-6h5.4c5.3,0,9.6-3.5,9.6-9a8.649,8.649,0,0,0-8.4-9Zm-.4,12H54v-6h5.5c2.6,0,4.2.6,4.2,3h0C63.7,16.968,62.2,17.968,59.5,17.968Z"/><polygon id="L" class="cls-1" points="81 5.968 75 5.968 75 29.968 90 29.968 90 23.968 81 23.968 81 5.968"/><path id="A" class="cls-1" d="M114,29.968h6l-9-24h-6l-9,24h6l1.1-3h9.8Zm-8.6-9,2.6-7,2.6,7Z"/><rect id="I" class="cls-1" x="126" y="5.968" width="6" height="24"/><path id="D" class="cls-1" d="M150.8,5.968H141v24h9.8c7.5,0,12.7-5.3,12.7-12S158.3,5.968,150.8,5.968Zm0,18H147v-12h3.8c4.3,0,7.2,1.8,7.2,6S155.1,23.968,150.8,23.968Z"/><path class="cls-2" d="M12,7.975l-4,4,1.7,1.7a18.221,18.221,0,0,0,6.19-1.811L12,7.975"/><polyline class="cls-3" points="32 11.979 20 23.989 24 27.993 32 11.979"/><path class="cls-4" d="M15.887,11.866A18.183,18.183,0,0,1,9.7,13.68L16,19.986l4,4,4-4Z"/><polygon class="cls-2" points="16 36 24 27.993 20 23.989 16 27.993 12 31.996 16 36"/><polyline class="cls-4" points="4 15.982 0 19.986 12 31.996 16 27.993 4 15.982"/><path class="cls-5" d="M9.7,13.68a25.564,25.564,0,0,1-3.446.046L4,15.982,16,27.993l4-4-4-4L9.7,13.68"/><path class="cls-3" d="M20,0,12,8.007l3.89,3.862a18.816,18.816,0,0,1,7.81-1.86,18.438,18.438,0,0,1,8.3,2L20,0"/><path class="cls-4" d="M8,11.979,6.254,13.726A17.111,17.111,0,0,0,9.7,13.68L8,11.979"/><path class="cls-3" d="M8,3.972,0,11.979a16.2,16.2,0,0,0,6.254,1.747L12,7.975l-4-4"/><polyline class="cls-3" points="0 11.979 0 19.986 4 15.982 0 11.979"/><path class="cls-2" d="M0,11.979H0l4,4,2.254-2.256A16.9,16.9,0,0,1,0,11.979"/><path class="cls-2" d="M23.7,9.977a18.223,18.223,0,0,0-7.811,1.89L24,19.986l8-8.007a18.451,18.451,0,0,0-8.3-2"/></g></g></g></svg>`

export default defineConfig({
  github: {
    login: 'kazupon',
    type: 'user'
  },

  outputDir: './',
  width: 800,
  formats: ['svg', 'png'],
  renderer: 'tiers',
  force: true,

  // Automatically Merge sponsors from different platforms
  sponsorsAutoMerge: true,

  async onSponsorsReady(sponsors) {
    await fs.writeFile(
      'sponsors.json',
      JSON.stringify(
        sponsors
          .filter(i => i.privacyLevel !== 'PRIVATE')
          .map(i => {
            return {
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.monthlyDollars,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === 'Organization'
            }
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2
      )
    )
  },
  onSponsorsAllFetched(sponsors) {
    sponsors.unshift({
      monthlyDollars: Infinity,
      privacyLevel: 'PUBLIC',
      sponsor: {
        name: 'Plaid, Inc.',
        login: 'plaidev',
        linkUrl: 'https://plaid.co.jp/',
        avatarUrl: 'https://avatars.githubusercontent.com/u/5219279?s=200&v=4',
        type: 'Organization'
      }
    })
    return sponsors
  },

  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: presetPast
    },
    {
      title: 'Coffee Supporters️',
      // monthlyDollars: 5,
      preset: tierPresets.small
    },
    {
      title: 'Kazupon Fan',
      monthlyDollars: 10,
      preset: tierPresets.small
    },
    {
      title: 'Awesome Supporters',
      monthlyDollars: 20,
      preset: tierPresets.medium
    },
    {
      title: 'Bronze Sponsors',
      monthlyDollars: 100,
      preset: tierPresets.large
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 250,
      preset: tierPresets.xl
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 500,
      preset: presetGold
    },
    {
      title: 'Platinum Sponsor',
      monthlyDollars: 1000,
      preset: presetPlatinum
    },
    {
      title: 'Special Sponsor',
      monthlyDollars: Infinity,
      preset: presetSpecial
    }
  ]
})
