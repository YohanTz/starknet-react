export { Connector } from "./base";
export { InjectedConnector, type InjectedConnectorOptions } from "./injected";

import { InjectedConnector } from "./injected";

export function argent(): InjectedConnector {
  return new InjectedConnector({
    options: {
      id: "argentX",
      name: "Argent",
      icon: {},
    },
  });
}

export function braavos(): InjectedConnector {
  return new InjectedConnector({
    options: {
      id: "braavos",
      name: "Braavos",
      icon: {},
    },
  });
}
