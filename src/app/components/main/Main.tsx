import EditorArea from "../editor/EditorArea";
import Sidebar from "../sidebar/inner/Sidebar";

export default function Main() {
  return (
    <main className="h-full w-full flex">
      <Sidebar />
      <EditorArea />
    </main>
  );
}
