function install_configuration(store, name) {
  store.registerModule(name, {
    namespaced: true,

    state: () => ({
      name,
      plank_width: 10,
      object_types: ['circle', 'rectangle', 'triangle'],
      min_object_weight: 1,
      max_object_weight: 10,
      kgm_side_limit: 20,
      hitboxes_count: 5,
      max_bending: 30,
      stump_height: 60,
    }),

    mutations: {}
  })
}

export {
  install_configuration,
}