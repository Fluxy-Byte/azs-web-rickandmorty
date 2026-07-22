
import { useAppDispatch, useAppSelector } from "../context/store";
import { updateThemeUser } from "../context/slices/userSlice";

export default function ToggleTheme() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  const updateTheme = (theme: string) => {
    dispatch(updateThemeUser(theme))
  }

  return (
    <button
      className="rounded bg-lime-400 px-4 py-2 text-black cursor-pointer"
      onClick={() => updateTheme(user.theme == "light" ? "dark" : "light")}
    >
      {user.theme == "light" ? "Claro" : "Escuro"}
    </button >
  );
}
