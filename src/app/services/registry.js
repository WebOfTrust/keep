import KERI from './keri';

class Registries {
  static ensureRegistry(alias, name, nonce) {
    KERI.listCredentialRegistries().then((registries) => {
      let found = registries.find((reg) => {
        return reg.name === name;
      });
      if (found === undefined) {
        KERI.createCredentialRegistry({ alias, name, nonce }).then(() => {
          console.log('successfully attempted to create credential registry');
        });
      }
    });
  }
}

module.exports = Registries;
