// Define the `main` function

function main(config) {

  if (!config.proxies || !config['proxy-groups']) return config;
  const hkRegex = /港|hk|HK|hongkong|hong kong/;
  const twRegex = /台|tw|TW|taiwan/;
  const jpRegex = /日本|jp|JP|japan/;
  const usRegex = /美|us|US|unitedstates|united states/;
  const sgRegex = /新|sg|SG|singapore/;
  const otherRegex = /🇭🇰|🇯🇵|🇺🇸|🇸🇬|🇨🇳|HK|TW|JP|US|SG|港|hk|hongkong|台|tw|taiwan|日|jp|japan|新|sg|singapore|美|us|unitedstates/;

  config.proxies.forEach((proxy) => {
    config['proxy-groups'][18].proxies.push(proxy.name); //全部地区
    config['proxy-groups'][19].proxies.push(proxy.name); //自动选择

    if (hkRegex.test(proxy.name)) {
      config['proxy-groups'][12].proxies.push(proxy.name);
      return;
    } //香港

    if (twRegex.test(proxy.name)) {
      config['proxy-groups'][13].proxies.push(proxy.name);
      return;
    }

    if (jpRegex.test(proxy.name)) {
      config['proxy-groups'][14].proxies.push(proxy.name);
      return;
    }

    if (usRegex.test(proxy.name)) {
      config['proxy-groups'][15].proxies.push(proxy.name);
      return;
    }

    if (sgRegex.test(proxy.name)) {
      config['proxy-groups'][16].proxies.push(proxy.name);
      return;
    }

    if (!otherRegex.test(proxy.name)) {
      config['proxy-groups'][17].proxies.push(proxy.name);
      return;
    } // 其它地区
  });

  return config;
}