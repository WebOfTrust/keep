class Witnesses {
  static witnessPools = [
    // {
    //   label: 'Local Witness Pool',
    //   value: 'local',
    // },
    // {
    //   label: 'Staging Witness Pool',
    //   value: 'staging',
    // },
    {
      label: 'GLEIF Pool 1',
      value: 'gleif-pool-1',
    },
    {
      label: 'GLEIF Pool 2',
      value: 'gleif-pool-2',
    },
  ];

  static witnesses = {
    // local: [
    //   'BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha',
    //   'BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM',
    //   'BIKKuvBwpmDVA4Ds-EpL5bt9OqPzWPja2LigFYZN2YfX',
    // ],
    // staging: [
    //   'BILZrnru0e-0MUmnnjOdWTrZ7OW3sCuk_C_67uYeLsN_',
    //   'BN6TBUuiDY_m87govmYhQ2ryYP2opJROqjDkZToxuxS2',
    //   'BBD748wGFn9-1nfVEtfwd97wc-HCw0LRF2xeIujmqJOQ',
    //   'BHeD7WvSDGwm0glBHGTuHpGeMRq7HyCOAJ8h_epQyHkR',
    //   'BBHjAqI2Bf_L6BtR0ueAGf12GXEKKCPo2etRCjuu87U7',
    // ],
    'gleif-pool-1': [
      "BDkq35LUU63xnFmfhljYYRY0ymkCg7goyeCxN30tsvmS",
      "BLmvLSt1mDShWS67aJNP4gBVBhtOc3YEu8SytqVSsyfw",
      "BHxz8CDS_mNxAhAxQe1qxdEIzS625HoYgEMgqjZH_g2X",
      "BGYJwPAzjyJgsipO7GY9ZsBTeoUJrdzjI2w_5N-Nl6gG",
      "BFl6k3UznzmEVuMpBOtUUiR2RO2NZkR3mKrZkNRaZedo"
    ],
    'gleif-pool-2': [
      "BNfDO63ZpGc3xiFb0-jIOUnbr_bA-ixMva5cZb3s4BHB",
      "BDwydI_FJJ-tvAtCl1tIu_VQqYTI3Q0JyHDhO1v2hZBt",
      "BICY3-X3S3iEsKH73Q1fF_w1JrXJ41V0c4Dn9aQjOSQ-",
      "BM4Ef3zlUzIAIx-VC8mXziIbtj-ZltM8Aor6TZzmTldj",
      "BLo6wQR73-eH5v90at_Wt8Ep_0xfz05qBjM3_B1UtKbC"
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
