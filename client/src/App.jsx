import { Provider } from "react-redux";
import AppRouter from "./components/AppRouter/AppRouter";
import store from "./redux/store";

const App = () => {
    return (
        <div>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </div>
    );
}

export default App;
