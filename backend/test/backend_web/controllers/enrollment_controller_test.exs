defmodule BackendWeb.EnrollmentControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.Enrollment

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:enrollment) do
    {:ok, enrollment} = Auth.create_enrollment(@create_attrs)
    enrollment
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all enrollments", %{conn: conn} do
      conn = get conn, enrollment_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create enrollment" do
    test "renders enrollment when data is valid", %{conn: conn} do
      conn = post conn, enrollment_path(conn, :create), enrollment: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, enrollment_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, enrollment_path(conn, :create), enrollment: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update enrollment" do
    setup [:create_enrollment]

    test "renders enrollment when data is valid", %{conn: conn, enrollment: %Enrollment{id: id} = enrollment} do
      conn = put conn, enrollment_path(conn, :update, enrollment), enrollment: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, enrollment_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, enrollment: enrollment} do
      conn = put conn, enrollment_path(conn, :update, enrollment), enrollment: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete enrollment" do
    setup [:create_enrollment]

    test "deletes chosen enrollment", %{conn: conn, enrollment: enrollment} do
      conn = delete conn, enrollment_path(conn, :delete, enrollment)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, enrollment_path(conn, :show, enrollment)
      end
    end
  end

  defp create_enrollment(_) do
    enrollment = fixture(:enrollment)
    {:ok, enrollment: enrollment}
  end
end
