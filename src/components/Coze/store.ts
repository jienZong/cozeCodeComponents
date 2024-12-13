import { create } from "zustand";

interface FileType{
  name:string,
  path:string,
  size:number
}

interface StoreState {
  content: string;
  files: Array<{ path: string; is_img: boolean ;icon:string|null,size:number|null ,is_loading:boolean,file_id:number}>;
  options: Array<string>;
  history: Array<{
      type:string,
      text: string | null,
      image: Array<string> | null,
      file: Array<FileType> | null
    }>;
  requestFlag: boolean;
  renderFlag: boolean;
  loading: boolean;
  setRequestFlag: (flag: boolean) => void;
  setRenderFlag: (flag: boolean) => void;
  setContent: (newContent: string) => void;
  pushFiles: (newFile: { path: string; is_img: boolean ;icon:string|null,size:number|null ,is_loading:boolean ,file_id:number}) => void;
  pushOptions: (newOptions: Array<string>) => void;
  pushHistory: (newItem: { 
    type:string,
    text: string | null,
    image: Array<string> | null,
    file: Array<FileType> | null
  }) => void;
  unshiftHistory: (newItem: {
    type:string,
    text: string | null,
    image: Array<string> | null,
    file: Array<FileType> | null
  }) => void;

  clearOptions:() => void,
  clearHistory:() => void,
  clearFiles:() => void,
  spliceHistory:(index:number,number:number) => void
  spliceFiles:(index:number,number:number) => void,
  setLoading:(flag:boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  content: "",
  files: [],
  options: [],
  history: [],
  requestFlag: false,
  renderFlag: false,
  loading:false,
  setLoading: (flag: boolean) => set({ loading: flag }),
  spliceHistory:(index:number,number:number) =>  set((state) => {
    const newOptions = [...state.options]; 
    newOptions.splice(index, number);
    return { options: newOptions };
  }),
  spliceFiles:(index:number,number:number) =>  set((state) => {
    const newOptions = [...state.files]; 
    newOptions.splice(index, number);
    return { files: newOptions };
  }),
  clearOptions: () => set(() => ({
    options: [],
  })),
  clearFiles: () => set(() => ({
    files: [],
  })),
  clearHistory: () => set(() => ({
    history: [], 
  })),
  setRequestFlag: (flag: boolean) => set({ requestFlag: flag }),
  setRenderFlag: (flag: boolean) => set({ renderFlag: flag }),
  setContent: (newContent: string) => set({ content: newContent }),
  pushFiles: (newFile: { path: string; is_img: boolean ;icon:string|null,size:number|null ,is_loading:boolean,file_id:number}) => set((state) => ({
    files: [...state.files, newFile],
  })),
  pushOptions: (newOptions: Array<string>) => set((state) => ({
    options: [...state.options, ...newOptions],
  })),
  pushHistory: (newItem: {
    type:string,
    text: string | null,
    image: Array<string> | null,
    file: Array<FileType> | null
  }) => set((state) => ({
    history: [...state.history, newItem],
  })),
  unshiftHistory: (newItem: {
    type:string,
    text: string | null,
    image: Array<string> | null,
    file: Array<FileType> | null
  }) => set((state) => ({
    history: [newItem,...state.history],
  })),
}));
