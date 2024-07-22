import { KanbanProvider } from "./app/context/kanban-context";
import { Layout } from "./view/_layouts/layout";
import Board from "./view/components/board";

function App() {
  return (
    <KanbanProvider>
  <Layout>
     <Board />
    </Layout>
    </KanbanProvider>
    
  );
}

export default App;
