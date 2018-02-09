defmodule BackendWeb.AssignmentControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.Assignment

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:assignment) do
    {:ok, assignment} = Auth.create_assignment(@create_attrs)
    assignment
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all assignments", %{conn: conn} do
      conn = get conn, assignment_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create assignment" do
    test "renders assignment when data is valid", %{conn: conn} do
      conn = post conn, assignment_path(conn, :create), assignment: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, assignment_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, assignment_path(conn, :create), assignment: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update assignment" do
    setup [:create_assignment]

    test "renders assignment when data is valid", %{conn: conn, assignment: %Assignment{id: id} = assignment} do
      conn = put conn, assignment_path(conn, :update, assignment), assignment: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, assignment_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, assignment: assignment} do
      conn = put conn, assignment_path(conn, :update, assignment), assignment: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete assignment" do
    setup [:create_assignment]

    test "deletes chosen assignment", %{conn: conn, assignment: assignment} do
      conn = delete conn, assignment_path(conn, :delete, assignment)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, assignment_path(conn, :show, assignment)
      end
    end
  end

  defp create_assignment(_) do
    assignment = fixture(:assignment)
    {:ok, assignment: assignment}
  end
end
