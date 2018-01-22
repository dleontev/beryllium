defmodule BackendWeb.DiscussionControllerTest do
  use BackendWeb.ConnCase

  alias Backend.Auth
  alias Backend.Auth.Discussion

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:discussion) do
    {:ok, discussion} = Auth.create_discussion(@create_attrs)
    discussion
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all discussions", %{conn: conn} do
      conn = get conn, discussion_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create discussion" do
    test "renders discussion when data is valid", %{conn: conn} do
      conn = post conn, discussion_path(conn, :create), discussion: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, discussion_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, discussion_path(conn, :create), discussion: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update discussion" do
    setup [:create_discussion]

    test "renders discussion when data is valid", %{conn: conn, discussion: %Discussion{id: id} = discussion} do
      conn = put conn, discussion_path(conn, :update, discussion), discussion: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, discussion_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id}
    end

    test "renders errors when data is invalid", %{conn: conn, discussion: discussion} do
      conn = put conn, discussion_path(conn, :update, discussion), discussion: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete discussion" do
    setup [:create_discussion]

    test "deletes chosen discussion", %{conn: conn, discussion: discussion} do
      conn = delete conn, discussion_path(conn, :delete, discussion)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, discussion_path(conn, :show, discussion)
      end
    end
  end

  defp create_discussion(_) do
    discussion = fixture(:discussion)
    {:ok, discussion: discussion}
  end
end
