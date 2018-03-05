defmodule BackendWeb.GradeControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.Grade

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:grade) do
    {:ok, grade} = Auth.create_grade(@create_attrs)
    grade
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all grades", %{conn: conn} do
      conn = get conn, grade_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create grade" do
    test "renders grade when data is valid", %{conn: conn} do
      conn = post conn, grade_path(conn, :create), grade: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, grade_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, grade_path(conn, :create), grade: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update grade" do
    setup [:create_grade]

    test "renders grade when data is valid", %{conn: conn, grade: %Grade{id: id} = grade} do
      conn = put conn, grade_path(conn, :update, grade), grade: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, grade_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, grade: grade} do
      conn = put conn, grade_path(conn, :update, grade), grade: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete grade" do
    setup [:create_grade]

    test "deletes chosen grade", %{conn: conn, grade: grade} do
      conn = delete conn, grade_path(conn, :delete, grade)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, grade_path(conn, :show, grade)
      end
    end
  end

  defp create_grade(_) do
    grade = fixture(:grade)
    {:ok, grade: grade}
  end
end
