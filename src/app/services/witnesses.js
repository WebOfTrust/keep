class Witnesses {
  static witnessPools = [
    {
      label: 'GLEIF vLEI Witness Pool',
      value: 'gleif',
    },
    {
      label: 'Pilot vLEI Witness Pool',
      value: 'pilot',
    },
    {
      label: 'Local Witness Pool',
      value: 'local',
    },
    {
      label: 'Staging Witness Pool',
      value: 'staging',
    },
  ];

  static witnesses = {
    local: [
      'BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha',
      'BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM',
      'BIKKuvBwpmDVA4Ds-EpL5bt9OqPzWPja2LigFYZN2YfX',
    ],
    gleif: ['BGGEhf-fxOpmashJo1IU0Hrq4CpwXvaL5TFesoMhG3dc', 'BBTyHdGnL3knmazWlhP58zDcco7-vr10sl5T9SuoIdYQ'],
    pilot: [
      'B4tbPLI_TEze0pzAA-X-gewpdg22yfzN8CdKKIF5wETM',
      'Boq71an-vhU6DtlZzzJF7yIqbQxb56rcxeB0LppxeDOA',
      'BHGK9Gem8PdiZ7PZ9WcIwxM7YnGaztYA65X3o5_RxFa8',
    ],
    staging: [
        'BILZrnru0e-0MUmnnjOdWTrZ7OW3sCuk_C_67uYeLsN_',
        'BN6TBUuiDY_m87govmYhQ2ryYP2opJROqjDkZToxuxS2',
        'BBD748wGFn9-1nfVEtfwd97wc-HCw0LRF2xeIujmqJOQ',
        'BHeD7WvSDGwm0glBHGTuHpGeMRq7HyCOAJ8h_epQyHkR',
    ]
  };

  static poolName(pool) {
    let v = Witnesses.witnessPools.find((p) => {return p.value === pool})
    if (v !== undefined) {
      return v.label;
    }

    return ""
  }

}

module.exports = Witnesses;
