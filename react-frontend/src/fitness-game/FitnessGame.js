import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

//solution for error: https://github.com/jeffreylanters/react-unity-webgl/issues/22

export default function FitnessGame() {
  const {
    unityProvider,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
  } = useUnityContext({
    loaderUrl: "FitnessGameBuild/Build/FitnessGameBuild.loader.js",
    dataUrl: "FitnessGameBuild/Build/FitnessGameBuild.data",
    frameworkUrl: "FitnessGameBuild/Build/FitnessGameBuild.framework.js",
    codeUrl: "FitnessGameBuild/Build/FitnessGameBuild.wasm",
  });

  useEffect(() => {
    return () => {
      detachAndUnloadImmediate().catch((reason) => {
        console.log(reason);
      });
    };
  }, [detachAndUnloadImmediate]);

  return (
    <div>
      <h1>Fitness Game</h1>
      <Unity
        unityProvider={unityProvider}
        style={{ width: 960, height: 540 }}
      />
    </div>
  );
}
