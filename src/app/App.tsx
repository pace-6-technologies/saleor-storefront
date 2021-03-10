import { useAuth } from "@saleor/sdk";
import { useRouter } from "next/router";
import React from "react";

import { Loader } from "@components/atoms";
import { demoMode, builderIoApiKey } from "@temp/constants";
import { BuilderComponent, builder } from "@builder.io/react";

import {
  // Footer,
  MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import "../globalStyles/scss/index.scss";

import Notifications from "./Notifications";

import "../globalStyles/scss/index.scss";

builder.init(builderIoApiKey as string);


const App: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <ShopProvider>
      <OverlayProvider pathname={pathname}>
        <MetaConsumer />
        <MainMenu demoMode={demoMode} />
          {children}
        <BuilderComponent model="footer" />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
