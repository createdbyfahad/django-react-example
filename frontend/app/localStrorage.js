import axios from "axios";

export const loadAuthState = () => {
  try{
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    let JSONparsed = JSON.parse(serializedState)
    if(JSONparsed.auth.access.token !== undefined){
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSONparsed.auth.access.token}`;
    }
    return JSONparsed;
  } catch (e) {
    return undefined;
  }
}

export const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  } catch (e) {
    // ignore
  }
}
