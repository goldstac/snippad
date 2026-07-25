export default function App() {
  return (
    <>
      <button
        className="border border-t-yellow-400"
        onClick={async () => {
          console.log(await window.app.helpers.getPlatform());
          console.log(await window.app.settings.getSettings());
          console.log(await window.app.theme.getTheme());
          // window.app.settings.setSettings({ te: "st" });
        }}
      >
        Cwick
      </button>
    </>
  );
}
