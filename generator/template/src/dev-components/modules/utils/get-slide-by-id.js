import store from '@/state/store'

export default (id) => {
    let result;
    store.state.structure.forEach(sl => {
        if (id === sl.id) result = sl
    });

    if (!result) throw new Error(`Slide with id: "${id}" not founded in structure!`);

    return result
}