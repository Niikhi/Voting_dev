import { createContext, useContext, useEffect, useState } from "react";
import {ethers} from "ethers"
import abi from "./abi.json"
import { createInstance, initFhevm } from "fhevmjs";
const GlobalContext = createContext();


export const GlobalContextProvider = ({ children }) => {
    const [address,setaddress]=  useState()
    const [contract,setcontract]=useState()
    const [instance,setinstance]=useState()

    const getAddress = async () => {
        const accounts = await window?.ethereum?.request({
          method: "eth_requestAccounts",
        });
        setaddress(accounts[0]);
    
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
    
        window?.ethereum?.on("chainChanged", () => {
          window.location.reload();
        });
        window?.ethereum?.on("accountsChanged", () => {
          window.location.reload();
        });
    
        if (chainId !== "0x1F49") {
          await window?.ethereum
            ?.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: "0x1F49",
                },
              ],
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      useEffect(() => {
        getAddress();
      }, [address]);

    const getcontract=async ()=>{
        const provider= new ethers.providers.Web3Provider(window.ethereum);

        const signer=await provider.getSigner();

        const Contract=new ethers.Contract("0xA0c8e818710906319ad4d3D9CFffe897A72E6552",abi,signer)

        setcontract(Contract);

    }

      useEffect(() => {
        getcontract();
      }, []);
      
      const getInstance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
    
        const ret = await provider.call({
          // fhe lib address, may need to be changed depending on network
          to: "0x000000000000000000000000000000000000005d",
          // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
          data: "0xd9d47bb001",
        });
        
        const abiCoder = new ethers.utils.AbiCoder();
        const decoded = abiCoder.decode(['bytes'], ret);
        
        const publicKey = decoded[0];
        
        // console.log(publicKey);
        
        await initFhevm();

        const Instance = await createInstance({ chainId, publicKey });
        setinstance(Instance);

    }

    useEffect(() => {
      getInstance();
    }, []);
    
    return (
        <GlobalContext.Provider
          value={{
            address,
            contract,
            instance


            
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
    };



export const useGlobalContext = () => useContext(GlobalContext);