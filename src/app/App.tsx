import React from "react";

import { useAuth } from "@saleor/sdk";
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
import { Routes } from "./routes";

import Notifications from "./Notifications";

builder.init(builderIoApiKey as string);

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <ShopProvider>
      <OverlayProvider>
        <MetaConsumer />
        <MainMenu demoMode={demoMode} />
        <Routes />
        {/* <Footer /> */}
        <BuilderComponent model="footer" />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
