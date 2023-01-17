import React, { useState } from "react";
import explorer from "./Data/explorer";
import useTraverseTree from "./hooks/useTraverse-tree";
import Folder from "./components/Folder";
import './App.css'


export default function App() {
  const [exploredata, setExplorerdata] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handelInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(exploredata, folderId, item, isFolder);
    setExplorerdata(finalTree);
  };
  return (
    <div className="App">
      <Folder handelInsertNode={handelInsertNode} explorer={exploredata} />
    </div>
  );
}
