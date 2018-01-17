defmodule BackendWeb.SessionsController do
  use BackendWeb, :controller
  
  alias Backend.Auth.User
  
  def create(conn, %{"email" => email, "entered_password" => entered_password}) do
    case authenticate(%{"email" => email, "entered_password" => entered_password}) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render("show.json", user: user, jwt: jwt)
      :error ->
        conn
        |> put_status(:unauthorized)
		    |> send_resp(200, "LOGIN_FAILED")
    end
  end

  defp authenticate(%{"email" => email, "entered_password" => entered_password}) do
    user = Backend.Repo.get_by!(User, email: email)

    case check_password(user, entered_password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(nil, _), do: Comeonin.Bcrypt.dummy_checkpw()
  
  defp check_password(user, entered_password) do
    Comeonin.Bcrypt.checkpw(entered_password, user.password)
  end

  def delete(conn, _params) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke!(jwt)

    conn
    |> put_status(:ok)
  end

end
