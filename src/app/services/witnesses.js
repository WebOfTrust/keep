class Witnesses {
  static witnessPools = [
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
    staging: [
      'BILZrnru0e-0MUmnnjOdWTrZ7OW3sCuk_C_67uYeLsN_',
      'BN6TBUuiDY_m87govmYhQ2ryYP2opJROqjDkZToxuxS2',
      'BBD748wGFn9-1nfVEtfwd97wc-HCw0LRF2xeIujmqJOQ',
      'BHeD7WvSDGwm0glBHGTuHpGeMRq7HyCOAJ8h_epQyHkR',
      'BBHjAqI2Bf_L6BtR0ueAGf12GXEKKCPo2etRCjuu87U7',
    ],
  };

  static poolName(pool) {
    let v = Witnesses.witnessPools.find((p) => {
      return p.value === pool;
    });
    if (v !== undefined) {
      return v.label;
    }

    return '';
  }
}

module.exports = Witnesses;
