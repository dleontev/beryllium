defmodule Backend.Auth.Role do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Role

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "roles" do
    field :name, :string, null: false
    field :change_course_state, :boolean, null: false
    field :manage_grades, :boolean, null: false
    field :manage_groups, :boolean, null: false
    field :manage_files, :boolean, null: false
    field :manage_pages, :boolean, null: false
    field :manage_students, :boolean, null: false
    field :manage_discussions, :boolean, null: false
    field :manage_admins, :boolean, null: false
    field :manage_courses, :boolean, null: false
    field :manage_settings, :boolean, null: false
    field :manage_announcements, :boolean, null: false
    field :manage_permissions, :boolean, null: false
    field :manage_login_details, :boolean, null: false
  end

  @doc false
  def changeset(%Role{} = role, attrs) do
    role
    |> cast(attrs, [])
    |> validate_required([])
    |> unique_constraint(:id)
  end
end
