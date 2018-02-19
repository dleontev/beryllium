defmodule BackendWeb.MembershipView do
  use BackendWeb, :view
  alias BackendWeb.MembershipView

  def render("index.json", %{memberships: memberships}) do
    %{data: render_many(memberships, MembershipView, "membership.json")}
  end

  def render("index_by_section.json", %{memberships: memberships}) do
    %{data: render_many(memberships, MembershipView, "membership_by_section.json")}
  end

  def render("show.json", %{membership: membership}) do
    %{data: render_one(membership, MembershipView, "membership.json")}
  end

  def render("membership.json", %{membership: membership}) do
    %{id: membership.id}
  end

  def render("membership_by_section.json", %{membership: membership}) do
    %{
      id: membership.id, 
      user_id: membership.user_id, 
      group_id: membership.group_id
    }
  end
end
