import { InfoCircle, Settings } from "reicon-react";
import { GitHubUser } from "../../types/gist";
import SidebarItem from "./SidebarItem";

type SidebarBottomProps = {
  user?: GitHubUser;
  isSidebarOpen: boolean;
};

export default function SidebarBottom({
  user,
  isSidebarOpen,
}: SidebarBottomProps) {
  if (!user) return <></>;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <SidebarItem
          icon={<Settings />}
          label="Settings"
          active={false}
          onClick={() => {}}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<InfoCircle />}
          label="About"
          active={false}
          onClick={() => {}}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
      {/*TODO: add small user info card*/}
      <div></div>
    </div>
  );
}
