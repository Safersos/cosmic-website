// Optional local workaround for a DNS provider that refuses Neon domains.
// Applies only to this Node process, and preserves TLS hostname verification.
import dns from 'node:dns';
if (process.env.COSMIC_DNS_SERVER) {
  const resolver=new dns.Resolver(); resolver.setServers([process.env.COSMIC_DNS_SERVER]);
  const lookup=dns.lookup;
  dns.lookup=function(host,options,callback) {
    if(typeof options==='function') {callback=options;options={};}
    if(!host.endsWith('.neon.tech')) return lookup.call(dns,host,options,callback);
    resolver.resolve4(host,(error,addresses)=>{
      if(error) return callback(error);
      if(options?.all) callback(null,addresses.map(address=>({address,family:4})));
      else callback(null,addresses[0],4);
    });
  };
}
