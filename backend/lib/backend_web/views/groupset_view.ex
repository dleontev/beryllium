defmodule BackendWeb.GroupsetView do
  use BackendWeb, :view
  alias BackendWeb.GroupsetView

  def render("index.json", %{groupsets: groupsets}) do
    %{data: render_many(groupsets, GroupsetView, "groupset.json")}
  end

  def render("show.json", %{groupset: groupset}) do
    %{data: render_one(groupset, GroupsetView, "groupset.json")}
  end

  def render("groupset.json", %{groupset: groupset}) do
    %{
      id: groupset.id, 
      name: groupset.name,
      is_selfsignup: groupset.is_selfsignup
    }
  end
end
