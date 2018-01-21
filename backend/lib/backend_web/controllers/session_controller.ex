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
		    |> render("error.json")
    end
  end

  defp authenticate(%{"email" => email, "entered_password" => entered_password}) do
    user = Backend.Repo.get_by!(User, email: String.downcase(email))

    case check_password(user, entered_password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  def refresh(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    jwt = Guardian.Plug.current_token(conn)
    {:ok, claims} = Guardian.Plug.claims(conn)

    case Guardian.refresh!(jwt, claims, %{ttl: {7, :days}}) do
      {:ok, new_jwt, _new_claims} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_jwt)
      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end  

  defp check_password(nil, _), do: Comeonin.Bcrypt.dummy_checkpw()
  
  defp check_password(user, entered_password) do
    case user do
      nil -> Comeonin.Bcrypt.dummy_checkpw()
      _ -> Comeonin.Bcrypt.checkpw(entered_password, user.password)
    end
  end

  def delete(conn, _params) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke!(jwt)

    conn
    |> put_status(:ok)
    |> render("delete.json")    
  end

end
