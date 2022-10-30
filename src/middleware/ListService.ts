
export default function ListService(api) {

  const getLists = (filter = {}) => {
    return api.get('/lists', filter);
  };

  const newList = (name, sharedWith) => {
    return api.post('/lists', {
      name,
      sharedWith
    });
  };

  const newSoloList = (name) => {
    return api.post('/lists', {
      name
    });
  };

  const updateList = (listId, name, sharedWith) => {
    return api.post(`/lists/${listId}`, {
      name,
      sharedWith
    });
  };

  const removeList = (listId) => {
    return api.delete(`/lists/${listId}`);
  };

  const finishList = (listId, opts = {}) => {
    return api.post(`/lists/${listId}/finish`, { opts });
  };

  const getList = (listId) => {
    return api.get(`/lists/${listId}`);
  };

  /**
   * 
   * @param {*} listId 
   * @returns items of the selected list
   */
  const getListItems = (listId) => {
    return api.get(`/lists/${listId}/items`, {});
  };

  /**
   * Inserts a new item in the list
   * @param {*} list ID of the current list
   * @param {*} item item object to be inserted
   * @returns the inserted item
   */
  const newListItem = (listId, item) => {
    return api.post(`/lists/${listId}/items`, {
      item
    });
  };

  const updateListItem = (item) => {
    return api.post(`/lists/items/${item._id}`, {
      item
    });
  }

  return {
    getList,
    getListItems,
    getLists,
    newList,
    newSoloList,
    newListItem,
    updateList,
    updateListItem,
    removeList,
    finishList
  }
};
