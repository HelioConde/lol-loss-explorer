(() => {
  const existing=window.LOL_LOSS_EXPLORER_BACKEND||{};
  const functionsBase=typeof existing.functionsBase==="string"&&existing.functionsBase
    ? existing.functionsBase.replace(/\/$/,"")
    : "https://bieihhaobdztjyoweewa.supabase.co/functions/v1";

  window.LOL_LOSS_EXPLORER_BACKEND=Object.freeze({
    functionsBase,
    profile:existing.profile||functionsBase+"/public-lol-profile",
    source:"zerotwo-gamer-supabase"
  });
})();
