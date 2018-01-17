defmodule BackendWeb.GroupsetControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.Groupset

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:groupset) do
    {:ok, groupset} = Auth.create_groupset(@create_attrs)
    groupset
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all groupsets", %{conn: conn} do
      conn = get conn, groupset_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create groupset" do
    test "renders groupset when data is valid", %{conn: conn} do
      conn = post conn, groupset_path(conn, :create), groupset: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, groupset_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, groupset_path(conn, :create), groupset: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update groupset" do
    setup [:create_groupset]

    test "renders groupset when data is valid", %{conn: conn, groupset: %Groupset{id: id} = groupset} do
      conn = put conn, groupset_path(conn, :update, groupset), groupset: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, groupset_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, groupset: groupset} do
      conn = put conn, groupset_path(conn, :update, groupset), groupset: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete groupset" do
    setup [:create_groupset]

    test "deletes chosen groupset", %{conn: conn, groupset: groupset} do
      conn = delete conn, groupset_path(conn, :delete, groupset)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, groupset_path(conn, :show, groupset)
      end
    end
  end

  defp create_groupset(_) do
    groupset = fixture(:groupset)
    {:ok, groupset: groupset}
  end
end
