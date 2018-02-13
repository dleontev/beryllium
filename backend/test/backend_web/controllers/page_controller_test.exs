defmodule BackendWeb.PageControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.Page

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:page) do
    {:ok, page} = Auth.create_page(@create_attrs)
    page
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all pages", %{conn: conn} do
      conn = get conn, page_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create page" do
    test "renders page when data is valid", %{conn: conn} do
      conn = post conn, page_path(conn, :create), page: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, page_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, page_path(conn, :create), page: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update page" do
    setup [:create_page]

    test "renders page when data is valid", %{conn: conn, page: %Page{id: id} = page} do
      conn = put conn, page_path(conn, :update, page), page: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, page_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, page: page} do
      conn = put conn, page_path(conn, :update, page), page: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete page" do
    setup [:create_page]

    test "deletes chosen page", %{conn: conn, page: page} do
      conn = delete conn, page_path(conn, :delete, page)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, page_path(conn, :show, page)
      end
    end
  end

  defp create_page(_) do
    page = fixture(:page)
    {:ok, page: page}
  end
end
