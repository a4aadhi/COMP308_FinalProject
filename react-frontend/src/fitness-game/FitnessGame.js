import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function FitnessGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/fitnessGame/Build/fitnessGame.loader.js",
    dataUrl: "/fitnessGame/Build/fitnessGame.data",
    frameworkUrl: "/fitnessGame/Build/fitnessGame.framework.js",
    codeUrl: "/fitnessGame/Build/fitnessGame.wasm",
  });

  return (
    <div>
      <h1 style={{justifySelf:"center",alignItems:"center", textAlign:"center"}}>Fitness Game</h1>
      <Unity unityProvider={unityProvider} style={{ width: 960, height: 540, justifySelf:"center",alignItems:"center" }} />
    </div>
  );
}

    

  