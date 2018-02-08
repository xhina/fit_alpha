import React from 'react';

let loadedpageUID = null;
let loadPageUID = null;
const REF_TABLES = {};
const PAGE_COMPS = {};

let pageViewAdapter;

export function bindPageViewAdapter(adapter) {
  pageViewAdapter = adapter;
}

export const createPageComponent = (pageUID, options) => {
  let pageView = pageViewAdapter(pageUID, {...options, key:pageUID.toString(), ref:e=>addRefTable(pageUID, e)});
  addPageComp(pageUID, pageView);
  loadedpageUID = loadPageUID;
  loadPageUID = pageUID;
  return pageView;
};

const addRefTable = (pageUID, ref)=> {
  REF_TABLES[pageUID] = ref;
}

const addPageComp = (pageUID, comp)=> {
  PAGE_COMPS[pageUID] = comp;
}

export const getReactRef = (pageUID)=> {
  return REF_TABLES[pageUID];
}
