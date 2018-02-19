defmodule BackendWeb.AssignmentToUserControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.AssignmentToUser

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:assignment_to_user) do
    {:ok, assignment_to_user} = Auth.create_assignment_to_user(@create_attrs)
    assignment_to_user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all assignments_to_users", %{conn: conn} do
      conn = get conn, assignment_to_user_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create assignment_to_user" do
    test "renders assignment_to_user when data is valid", %{conn: conn} do
      conn = post conn, assignment_to_user_path(conn, :create), assignment_to_user: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, assignment_to_user_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, assignment_to_user_path(conn, :create), assignment_to_user: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update assignment_to_user" do
    setup [:create_assignment_to_user]

    test "renders assignment_to_user when data is valid", %{conn: conn, assignment_to_user: %AssignmentToUser{id: id} = assignment_to_user} do
      conn = put conn, assignment_to_user_path(conn, :update, assignment_to_user), assignment_to_user: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, assignment_to_user_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, assignment_to_user: assignment_to_user} do
      conn = put conn, assignment_to_user_path(conn, :update, assignment_to_user), assignment_to_user: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete assignment_to_user" do
    setup [:create_assignment_to_user]

    test "deletes chosen assignment_to_user", %{conn: conn, assignment_to_user: assignment_to_user} do
      conn = delete conn, assignment_to_user_path(conn, :delete, assignment_to_user)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, assignment_to_user_path(conn, :show, assignment_to_user)
      end
    end
  end

  defp create_assignment_to_user(_) do
    assignment_to_user = fixture(:assignment_to_user)
    {:ok, assignment_to_user: assignment_to_user}
  end
end
