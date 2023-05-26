export const environment = {
  production: true,
  contentEnviroments : [
    {
      name: 'DBRANCH-DEV',
      url: 'https://dev.dbranch.asee.dev/v1',
      isActive: true
    },
    {
      name: 'HALK-DEV',
      url: 'https://apis-dev-halkbbg.df.asee.dev/v1',
      isActive: false
    },
    {
      name: 'UAT',
      url: 'https://digital-frontline.cabank.co.yu/v1',
      isActive: false
    }
  ]
};
