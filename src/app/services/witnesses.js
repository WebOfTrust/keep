class Witnesses {
  static witnessPools = [
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
