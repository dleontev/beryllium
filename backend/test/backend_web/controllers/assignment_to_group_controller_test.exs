defmodule BackendWeb.AssignmentToGroupControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.AssignmentToGroup

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:assignment_to_group) do
    {:ok, assignment_to_group} = Auth.create_assignment_to_group(@create_attrs)
    assignment_to_group
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all assignments_to_groups", %{conn: conn} do
      conn = get conn, assignment_to_group_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create assignment_to_group" do
    test "renders assignment_to_group when data is valid", %{conn: conn} do
      conn = post conn, assignment_to_group_path(conn, :create), assignment_to_group: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, assignment_to_group_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, assignment_to_group_path(conn, :create), assignment_to_group: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update assignment_to_group" do
    setup [:create_assignment_to_group]

    test "renders assignment_to_group when data is valid", %{conn: conn, assignment_to_group: %AssignmentToGroup{id: id} = assignment_to_group} do
      conn = put conn, assignment_to_group_path(conn, :update, assignment_to_group), assignment_to_group: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, assignment_to_group_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, assignment_to_group: assignment_to_group} do
      conn = put conn, assignment_to_group_path(conn, :update, assignment_to_group), assignment_to_group: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete assignment_to_group" do
    setup [:create_assignment_to_group]

    test "deletes chosen assignment_to_group", %{conn: conn, assignment_to_group: assignment_to_group} do
      conn = delete conn, assignment_to_group_path(conn, :delete, assignment_to_group)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, assignment_to_group_path(conn, :show, assignment_to_group)
      end
    end
  end

  defp create_assignment_to_group(_) do
    assignment_to_group = fixture(:assignment_to_group)
    {:ok, assignment_to_group: assignment_to_group}
  end
end
