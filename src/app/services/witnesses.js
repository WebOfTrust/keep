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
