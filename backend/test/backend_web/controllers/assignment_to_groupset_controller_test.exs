defmodule BackendWeb.Assignment_to_groupsetControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.Assignment_to_groupset

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:assignment_to_groupset) do
    {:ok, assignment_to_groupset} = Auth.create_assignment_to_groupset(@create_attrs)
    assignment_to_groupset
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all assignments_to_groupsets", %{conn: conn} do
      conn = get conn, assignment_to_groupset_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create assignment_to_groupset" do
    test "renders assignment_to_groupset when data is valid", %{conn: conn} do
      conn = post conn, assignment_to_groupset_path(conn, :create), assignment_to_groupset: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, assignment_to_groupset_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, assignment_to_groupset_path(conn, :create), assignment_to_groupset: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update assignment_to_groupset" do
    setup [:create_assignment_to_groupset]

    test "renders assignment_to_groupset when data is valid", %{conn: conn, assignment_to_groupset: %Assignment_to_groupset{id: id} = assignment_to_groupset} do
      conn = put conn, assignment_to_groupset_path(conn, :update, assignment_to_groupset), assignment_to_groupset: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, assignment_to_groupset_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, assignment_to_groupset: assignment_to_groupset} do
      conn = put conn, assignment_to_groupset_path(conn, :update, assignment_to_groupset), assignment_to_groupset: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete assignment_to_groupset" do
    setup [:create_assignment_to_groupset]

    test "deletes chosen assignment_to_groupset", %{conn: conn, assignment_to_groupset: assignment_to_groupset} do
      conn = delete conn, assignment_to_groupset_path(conn, :delete, assignment_to_groupset)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, assignment_to_groupset_path(conn, :show, assignment_to_groupset)
      end
    end
  end

  defp create_assignment_to_groupset(_) do
    assignment_to_groupset = fixture(:assignment_to_groupset)
    {:ok, assignment_to_groupset: assignment_to_groupset}
  end
end
