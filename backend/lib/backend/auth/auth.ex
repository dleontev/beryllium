defmodule Backend.Auth do
  @moduledoc """
  The Auth context.
  """

  import Ecto.Query

  alias Backend.Repo
  alias Backend.Auth.User
  alias Backend.Auth.Enrollment
  alias Backend.Auth.Group
  alias Backend.Auth.Groupset
  alias Backend.Auth.School
  alias Backend.Auth.Section
  alias Backend.Auth.Course
  alias Backend.Auth.Enrollment
  alias Backend.Auth.Group
  alias Backend.Auth.Groupset
  alias Backend.Auth.Membership
  alias Backend.Auth.Post
  alias Backend.Auth.Discussion
  alias Backend.Auth.AssignmentToUser
  alias Backend.Auth.AssignmentToGroup
  alias Backend.Auth.Grade

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Returns the list of users within the specified section.

  ## Examples

      iex> list_users_by_section(section_id)
      [%User{}, ...]

  """
  def list_users_by_section(section_id) do
    query =
      from(
        u in User,
        join: e in Enrollment,
        on: u.id == e.user_id,
        join: s in Section,
        on: e.section_id == s.id and s.id == ^section_id,
        join: c in Course,
        on: s.course_id == c.id,
        order_by: [desc: u.name],
        select: {
          map(s, [:name]),
          map(u, [:id, :name]),
          map(c, [:code]),
          map(e, [:role])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_user_info(x) | acc] end)
  end

  defp extract_user_info({
         %{name: section_name},
         %{id: user_id, name: name},
         %{code: code},
         %{role: role_name}
       }) do
    %{
      section_name: section_name,
      user_id: user_id,
      name: name,
      course_code: code,
      role_name: role_name
    }
  end

  @doc """
  Returns the list of users within the specified section.

  ## Examples

      iex> list_users_by_section(section_id)
      [%User{}, ...]

  """
  def list_users_by_group(group_id) do
    Repo.all(
      from(
        u in User,
        join: m in Membership,
        on: m.user_id == u.id and m.group_id == ^group_id,
        order_by: [asc: u.name],
        select: [:id, :name, :email]
      )
    )
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Hash a password.
  """
  def hash_password(password) do
    Comeonin.Bcrypt.hashpwsalt(password)
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  @doc """
  Gets a single course.

  Raises `Ecto.NoResultsError` if the Course does not exist.

  ## Examples

      iex> get_course!(123)
      %Course{}

      iex> get_course!(456)
      ** (Ecto.NoResultsError)

  """
  def get_course!(id), do: Repo.get!(Course, id)

  def get_course(section_id) do
    Repo.one(
      from(
        c in Course,
        join: s in Section,
        on: s.course_id == c.id and s.id == ^section_id,
        select: [:name, :code, :id]
      )
    )
  end

  @doc """
  Creates a course.

  ## Examples

      iex> create_course(%{field: value})
      {:ok, %Course{}}

      iex> create_course(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_course(attrs \\ %{}) do
    %Course{}
    |> Course.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a course.

  ## Examples

      iex> update_course(course, %{field: new_value})
      {:ok, %Course{}}

      iex> update_course(course, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_course(%Course{} = course, attrs) do
    course
    |> Course.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Course.

  ## Examples

      iex> delete_course(course)
      {:ok, %Course{}}

      iex> delete_course(course)
      {:error, %Ecto.Changeset{}}

  """
  def delete_course(%Course{} = course) do
    Repo.delete(course)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking course changes.

  ## Examples

      iex> change_course(course)
      %Ecto.Changeset{source: %Course{}}

  """
  def change_course(%Course{} = course) do
    Course.changeset(course, %{})
  end

  @doc """
  Returns the list of enrollments.

  ## Examples

      iex> list_enrollments()
      [%Enrollment{}, ...]

  """
  def list_enrollments do
    Repo.all(Enrollment)
  end

  @doc """
  Gets a single enrollment.

  Raises `Ecto.NoResultsError` if the Enrollment does not exist.

  ## Examples

      iex> get_enrollment!(123)
      %Enrollment{}

      iex> get_enrollment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_enrollment!(id), do: Repo.get!(Enrollment, id)

  def get_enrollment!(user_id, section_id) do
    Repo.get_by!(Enrollment, user_id: user_id, section_id: section_id)
  end

  @doc """
  Creates a enrollment.

  ## Examples

      iex> create_enrollment(%{field: value})
      {:ok, %Enrollment{}}

      iex> create_enrollment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_enrollment(attrs \\ %{}) do
    %Enrollment{}
    |> Enrollment.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a enrollment.

  ## Examples

      iex> update_enrollment(enrollment, %{field: new_value})
      {:ok, %Enrollment{}}

      iex> update_enrollment(enrollment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_enrollment(%Enrollment{} = enrollment, attrs) do
    enrollment
    |> Enrollment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Enrollment.

  ## Examples

      iex> delete_enrollment(enrollment)
      {:ok, %Enrollment{}}

      iex> delete_enrollment(enrollment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_enrollment(%Enrollment{} = enrollment) do
    Repo.delete(enrollment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking enrollment changes.

  ## Examples

      iex> change_enrollment(enrollment)
      %Ecto.Changeset{source: %Enrollment{}}

  """
  def change_enrollment(%Enrollment{} = enrollment) do
    Enrollment.changeset(enrollment, %{})
  end

  @doc """
  Returns the list of groups.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_groups do
    Repo.all(Group)
  end

  @doc """
  Returns the list of groups for given userid.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_groups(user_id) do
    query =
      from(
        g in Group,
        join: gs in Groupset,
        on: g.groupset_id == gs.id,
        join: m in Membership,
        on: m.group_id == g.id and m.user_id == ^user_id,
        join: s in Section,
        on: s.id == gs.section_id,
        join: c in Course,
        on: s.course_id == c.id,
        order_by: [desc: c.name, desc: g.name],
        select: {
          map(g, [:id, :name]),
          map(c, [:name, :code]),
          map(s, [:id])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_group_info(x) | acc] end)
  end

  defp extract_group_info({
         %{name: group_name, id: group_id},
         %{name: course_name, code: course_code},
         %{id: section_id}
       }) do
    %{
      group_id: group_id,
      group_name: group_name,
      course_name: course_name,
      course_code: course_code,
      section_id: section_id
    }
  end

  @doc """
  Returns the list of groups for given section.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_groups_by_section(section_id) do
    query =
      from(
        g in Group,
        join: gs in Groupset,
        on: gs.id == g.groupset_id,
        where: g.section_id == ^section_id,
        order_by: [desc: gs.name, desc: g.name],
        select: {
          map(g, [:id, :name, :groupset_id, :max_members]),
          map(gs, [:name, :is_selfsignup])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_section_group_info(x) | acc] end)
  end

  defp extract_section_group_info({
         %{
           id: id,
           name: name,
           groupset_id: groupset_id,
           max_members: max_members
         },
         %{
           name: groupset_name,
           is_selfsignup: is_selfsignup
         }
       }) do
    %{
      id: id,
      name: name,
      is_selfsignup: is_selfsignup,
      groupset_id: groupset_id,
      groupset_name: groupset_name,
      max_members: max_members
    }
  end

  @doc """
  Returns the list of users that belong to any group in the given section.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_members_by_section(section_id) do
    query =
      from(
        e in Enrollment,
        join: u in User,
        on: u.id == e.user_id,
        join: gs in Groupset,
        on: gs.section_id == ^section_id,
        left_join: m in Membership,
        on: m.groupset_id == gs.id and m.user_id == u.id,
        where: e.section_id == ^section_id and e.role == "student",
        order_by: [desc: u.name],
        select: {
          map(u, [:id, :name]),
          map(m, [:group_id]),
          map(gs, [:id])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_group_user_info(x) | acc] end)
  end

  defp extract_group_user_info({
         %{id: id, name: name},
         %{group_id: group_id},
         %{id: groupset_id}
       }) do
    %{
      id: id,
      name: name,
      group_id: group_id,
      groupset_id: groupset_id
    }
  end

  defp extract_group_user_info({
         %{id: id, name: name},
         nil,
         %{id: groupset_id}
       }) do
    %{
      id: id,
      name: name,
      group_id: nil,
      groupset_id: groupset_id
    }
  end

  @doc """
  Gets a single group.

  Raises `Ecto.NoResultsError` if the Group does not exist.

  ## Examples

      iex> get_group!(123)
      %Group{}

      iex> get_group!(456)
      ** (Ecto.NoResultsError)

  """
  def get_group!(id), do: Repo.get!(Group, id)

  @doc """
  Creates a group.

  ## Examples

      iex> create_group(%{field: value})
      {:ok, %Group{}}

      iex> create_group(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_group(attrs \\ %{}) do
    %Group{}
    |> Group.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a group.

  ## Examples

      iex> update_group(group, %{field: new_value})
      {:ok, %Group{}}

      iex> update_group(group, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_group(%Group{} = group, attrs) do
    group
    |> Group.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Group.

  ## Examples

      iex> delete_group(group)
      {:ok, %Group{}}

      iex> delete_group(group)
      {:error, %Ecto.Changeset{}}

  """
  def delete_group(%Group{} = group) do
    Repo.delete(group)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking group changes.

  ## Examples

      iex> change_group(group)
      %Ecto.Changeset{source: %Group{}}

  """
  def change_group(%Group{} = group) do
    Group.changeset(group, %{})
  end

  @doc """
  Returns the list of groupsets.

  ## Examples

      iex> list_groupsets()
      [%Groupset{}, ...]

  """
  def list_groupsets do
    Repo.all(Groupset)
  end

  def get_groupsets_by_section_id(section_id) do
    query =
      from(
        g in Groupset,
        where: g.section_id == ^section_id,
        order_by: g.name,
        select: [:id, :name, :is_selfsignup]
      )

    Repo.all(query)
  end

  @doc """
  Gets a single groupset.

  Raises `Ecto.NoResultsError` if the Groupset does not exist.

  ## Examples

      iex> get_groupset!(123)
      %Groupset{}

      iex> get_groupset!(456)
      ** (Ecto.NoResultsError)

  """
  def get_groupset!(id), do: Repo.get!(Groupset, id)

  @doc """
  Creates a groupset.

  ## Examples

      iex> create_groupset(%{field: value})
      {:ok, %Groupset{}}

      iex> create_groupset(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_groupset(attrs \\ %{}) do
    %Groupset{}
    |> Groupset.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a groupset.

  ## Examples

      iex> update_groupset(groupset, %{field: new_value})
      {:ok, %Groupset{}}

      iex> update_groupset(groupset, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_groupset(%Groupset{} = groupset, attrs) do
    groupset
    |> Groupset.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Groupset.

  ## Examples

      iex> delete_groupset(groupset)
      {:ok, %Groupset{}}

      iex> delete_groupset(groupset)
      {:error, %Ecto.Changeset{}}

  """
  def delete_groupset(%Groupset{} = groupset) do
    Repo.delete(groupset)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking groupset changes.

  ## Examples

      iex> change_groupset(groupset)
      %Ecto.Changeset{source: %Groupset{}}

  """
  def change_groupset(%Groupset{} = groupset) do
    Groupset.changeset(groupset, %{})
  end

  alias Backend.Auth.School

  @doc """
  Returns the list of schools.

  ## Examples

      iex> list_schools()
      [%School{}, ...]

  """
  def list_schools do
    Repo.all(School)
  end

  @doc """
  Gets a single school.

  Raises `Ecto.NoResultsError` if the School does not exist.

  ## Examples

      iex> get_school!(123)
      %School{}

      iex> get_school!(456)
      ** (Ecto.NoResultsError)

  """
  def get_school!(id), do: Repo.get!(School, id)

  @doc """
  Creates a school.

  ## Examples

      iex> create_school(%{field: value})
      {:ok, %School{}}

      iex> create_school(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_school(attrs \\ %{}) do
    %School{}
    |> School.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a school.

  ## Examples

      iex> update_school(school, %{field: new_value})
      {:ok, %School{}}

      iex> update_school(school, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_school(%School{} = school, attrs) do
    school
    |> School.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a School.

  ## Examples

      iex> delete_school(school)
      {:ok, %School{}}

      iex> delete_school(school)
      {:error, %Ecto.Changeset{}}

  """
  def delete_school(%School{} = school) do
    Repo.delete(school)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking school changes.

  ## Examples

      iex> change_school(school)
      %Ecto.Changeset{source: %School{}}

  """
  def change_school(%School{} = school) do
    School.changeset(school, %{})
  end

  alias Backend.Auth.Section

  @doc """
  Returns the list of sections.

  ## Examples

      iex> list_sections()
      [%Section{}, ...]

  """
  def list_sections do
    Repo.all(Section)
  end

  @doc """
  Gets a single section.

  Raises `Ecto.NoResultsError` if the Section does not exist.

  ## Examples

      iex> get_section!(123)
      %Section{}

      iex> get_section!(456)
      ** (Ecto.NoResultsError)

  """
  def get_section!(id), do: Repo.get!(Section, id)

  @doc """
  Creates a section.

  ## Examples

      iex> create_section(%{field: value})
      {:ok, %Section{}}

      iex> create_section(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_section(attrs \\ %{}) do
    %Section{}
    |> Section.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a section.

  ## Examples

      iex> update_section(section, %{field: new_value})
      {:ok, %Section{}}

      iex> update_section(section, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_section(%Section{} = section, attrs) do
    section
    |> Section.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Section.

  ## Examples

      iex> delete_section(section)
      {:ok, %Section{}}

      iex> delete_section(section)
      {:error, %Ecto.Changeset{}}

  """
  def delete_section(%Section{} = section) do
    Repo.delete(section)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking section changes.

  ## Examples

      iex> change_section(section)
      %Ecto.Changeset{source: %Section{}}

  """
  def change_section(%Section{} = section) do
    Section.changeset(section, %{})
  end

  @doc """
  Returns a combined courses query.
  """
  def list_courses(user_id) do
    query =
      from(
        u in User,
        join: e in Enrollment,
        on: u.id == e.user_id and u.id == ^user_id,
        join: s in Section,
        on: e.section_id == s.id,
        join: c in Course,
        on: s.course_id == c.id,
        order_by: [desc: c.code],
        select: {
          map(s, [:name, :id, :published]),
          map(c, [:id, :code, :name, :start_date, :end_date]),
          map(e, [:role])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_course_info(x) | acc] end)
  end

  defp extract_course_info({
         %{name: section_name, id: section_id, published: published},
         %{id: id, end_date: end_date, code: code, name: name, start_date: start_date},
         %{role: role_name}
       }) do
    %{
      section_name: section_name,
      section_id: section_id,
      published: published,
      id: id,
      course_code: code,
      course_name: name,
      start_date: start_date,
      end_date: end_date,
      role_name: role_name
    }
  end

  @doc """
  Returns the discussions/announcements for the given sections.
  """
  def list_discussions(section_id, is_discussion) do
    query =
      from(
        d in Discussion,
        join: p in Post,
        on: p.discussion_id == d.id and is_nil(p.parent_id),
        join: u in User,
        on: u.id == p.user_id,
        order_by: p.inserted_at,
        where: d.section_id == ^section_id and d.is_discussion == ^is_discussion,
        select: {
          map(d, [:title, :id, :is_locked, :is_pinned]),
          map(p, [:content, :inserted_at, :updated_at]),
          map(u, [:id, :name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_discussion_info(x) | acc] end)
  end

  defp extract_discussion_info({
         %{title: title, id: id, is_locked: is_locked, is_pinned: is_pinned},
         %{content: content, inserted_at: inserted_at, updated_at: updated_at},
         %{name: author_name, id: author_id}
       }) do
    %{
      title: title,
      id: id,
      content: content,
      is_locked: is_locked,
      is_pinned: is_pinned,
      inserted_at: inserted_at,
      updated_at: updated_at,
      author_name: author_name,
      author_id: author_id
    }
  end

  @doc """
  Returns the posts for the given discussions/announcements.
  """
  def list_posts_by_discussion(discussion_id) do
    query =
      from(
        p in Post,
        join: u in User,
        on: u.id == p.user_id,
        where: p.discussion_id == ^discussion_id,
        order_by: p.updated_at,
        select: {
          map(p, [:id, :inserted_at, :updated_at, :content, :parent_id]),
          map(u, [:name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_post_info(x) | acc] end)
  end

  def list_posts_by_parent(post_id) do
    query =
      from(
        p in Post,
        join: u in User,
        on: p.user_id == u.id,
        where: p.parent_id == ^post_id,
        order_by: p.inserted_at,
        select: {
          map(p, [:id, :inserted_at, :updated_at, :content, :parent_id, :user_id, :is_deleted]),
          map(u, [:name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_post_info_with_user_id(x) | acc] end)
  end

  defp extract_post_info({
         %{
           id: id,
           inserted_at: inserted_at,
           updated_at: updated_at,
           content: content,
           parent_id: parent_id
         },
         %{name: author_name}
       }) do
    %{
      id: id,
      content: content,
      inserted_at: inserted_at,
      parent_id: parent_id,
      updated_at: updated_at,
      author_name: author_name
    }
  end

  defp extract_post_info_with_user_id({
         %{
           id: id,
           inserted_at: inserted_at,
           updated_at: updated_at,
           content: content,
           parent_id: parent_id,
           user_id: user_id,
           is_deleted: is_deleted
         },
         %{name: author_name}
       }) do
    %{
      id: id,
      content: content,
      inserted_at: inserted_at,
      parent_id: parent_id,
      user_id: user_id,
      is_deleted: is_deleted,
      updated_at: updated_at,
      author_name: author_name
    }
  end

  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts()
      [%Post{}, ...]

  """
  def list_posts do
    Repo.all(Post)
  end

  @doc """
  Gets a single post.

  Raises `Ecto.NoResultsError` if the Post does not exist.

  ## Examples

      iex> get_post!(123)
      %Post{}

      iex> get_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_post!(id), do: Repo.get!(Post, id)

  def get_post_by_discussion_id(discussion_id) do
    query =
      from(
        p in Post,
        join: u in User,
        on: p.user_id == u.id,
        where: p.discussion_id == ^discussion_id and is_nil(p.parent_id),
        select: {
          map(p, [:id, :inserted_at, :updated_at, :content, :parent_id]),
          map(u, [:name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_post_info(x) | acc] end)
  end

  def get_children_of_discussion(discussion_id) do
    query =
      from(
        p in Post,
        where: p.discussion_id == ^discussion_id and not is_nil(p.parent_id),
        select: count(p.id)
      )

    Repo.all(query)
  end

  @doc """
  Creates a post.

  ## Examples

      iex> create_post(%{field: value})
      {:ok, %Post{}}

      iex> create_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post.

  ## Examples

      iex> update_post(post, %{field: new_value})
      {:ok, %Post{}}

      iex> update_post(post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Post.

  ## Examples

      iex> delete_post(post)
      {:ok, %Post{}}

      iex> delete_post(post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_post(%Post{} = post) do
    Repo.delete(post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post changes.

  ## Examples

      iex> change_post(post)
      %Ecto.Changeset{source: %Post{}}

  """
  def change_post(%Post{} = post) do
    Post.changeset(post, %{})
  end

  @doc """
  Returns the list of discussions.

  ## Examples

      iex> list_discussions()
      [%Discussion{}, ...]

  """
  def list_discussions do
    Repo.all(Discussion)
  end

  @doc """
  Gets a single discussion.

  Raises `Ecto.NoResultsError` if the Discussion does not exist.

  ## Examples

      iex> get_discussion!(123)
      %Discussion{}

      iex> get_discussion!(456)
      ** (Ecto.NoResultsError)

  """
  def get_discussion!(id), do: Repo.get!(Discussion, id)

  @doc """
  Creates a discussion.

  ## Examples

      iex> create_discussion(%{field: value})
      {:ok, %Discussion{}}

      iex> create_discussion(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_discussion(attrs \\ %{}) do
    %Discussion{}
    |> Discussion.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a discussion.

  ## Examples

      iex> update_discussion(discussion, %{field: new_value})
      {:ok, %Discussion{}}

      iex> update_discussion(discussion, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_discussion(%Discussion{} = discussion, attrs) do
    discussion
    |> Discussion.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Discussion.

  ## Examples

      iex> delete_discussion(discussion)
      {:ok, %Discussion{}}

      iex> delete_discussion(discussion)
      {:error, %Ecto.Changeset{}}

  """
  def delete_discussion(%Discussion{} = discussion) do
    Repo.delete(discussion)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking discussion changes.

  ## Examples

      iex> change_discussion(discussion)
      %Ecto.Changeset{source: %Discussion{}}

  """
  def change_discussion(%Discussion{} = discussion) do
    Discussion.changeset(discussion, %{})
  end

  @doc """
  Returns the list of memberships.

  ## Examples

      iex> list_memberships()
      [%Membership{}, ...]

  """
  def list_memberships do
    Repo.all(Membership)
  end

  def get_memberships_by_section(section_id) do
    query =
      from(
        m in Membership,
        where: m.section_id == ^section_id,
        select: [:id, :user_id, :group_id]
      )

    Repo.all(query)
  end

  @doc """
  Gets a single membership.

  Raises `Ecto.NoResultsError` if the Membership does not exist.

  ## Examples

      iex> get_membership!(123)
      %Membership{}

      iex> get_membership!(456)
      ** (Ecto.NoResultsError)

  """
  def get_membership!(id), do: Repo.get!(Membership, id)

  @doc """
  Gets a single membership.

  Raises `Ecto.NoResultsError` if the Membership does not exist.

  ## Examples

      iex> get_membership!(123)
      %Membership{}

      iex> get_membership!(456)
      ** (Ecto.NoResultsError)

  """
  def get_membership!(user_id, section_id, group_id) do
    Repo.get_by!(Membership, user_id: user_id, section_id: section_id, group_id: group_id)
  end

  @doc """
  Creates a membership.

  ## Examples

      iex> create_membership(%{field: value})
      {:ok, %Membership{}}

      iex> create_membership(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_membership(attrs \\ %{}) do
    %Membership{}
    |> Membership.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a membership.

  ## Examples

      iex> update_membership(membership, %{field: new_value})
      {:ok, %Membership{}}

      iex> update_membership(membership, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_membership(%Membership{} = membership, attrs) do
    membership
    |> Membership.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Membership.

  ## Examples

      iex> delete_membership(membership)
      {:ok, %Membership{}}

      iex> delete_membership(membership)
      {:error, %Ecto.Changeset{}}

  """
  def delete_membership(%Membership{} = membership) do
    Repo.delete(membership)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking membership changes.

  ## Examples

      iex> change_membership(membership)
      %Ecto.Changeset{source: %Membership{}}

  """
  def change_membership(%Membership{} = membership) do
    Membership.changeset(membership, %{})
  end

  alias Backend.Auth.Assignment

  @doc """
  Returns the list of assignments.

  ## Examples

      iex> list_assignments()
      [%Assignment{}, ...]

  """
  def list_assignments do
    Repo.all(Assignment)
  end

  def list_assignments_by_section(section_id, conn) do
    %{id: user_id} = Guardian.Plug.current_resource(conn)
    [head | tail] = check_if_teacher(section_id, conn, user_id)

    query = 
      if(head == "teacher") do
        from a in Assignment,
        where: a.section_id == ^section_id,
        left_join: au in AssignmentToUser,
        on: a.id == au.assignment_id,
        left_join: ag in AssignmentToGroup,
        on: a.id == ag.assignment_id,
        left_join: m in Membership,
        on: m.group_id == ag.group_id,
        #where: not is_nil(ag.user_id) or not is_nil(au.user_id),
        distinct: [a.id],
        select: %{id: a.id, due_at: a.due_at, type: a.type, content: a.content, points_possible: a.points_possible, title: a.title, is_published: a.is_published, group_id: ag.group_id}
      else
        from a in Assignment,
        where: a.section_id == ^section_id,
        left_join: au in AssignmentToUser,
        on: a.id == au.assignment_id and au.user_id == ^user_id,
        left_join: ag in AssignmentToGroup,
        on: a.id == ag.assignment_id,
        left_join: m in Membership,
        on: m.group_id == ag.group_id and m.user_id == ^user_id,
        where: not is_nil(m.user_id) or au.user_id == ^user_id,
        select: %{id: a.id, due_at: a.due_at, type: a.type, content: a.content, points_possible: a.points_possible, title: a.title, is_published: a.is_published, group_id: ag.group_id}
      end
    result = Repo.all(query)
    IO.inspect(result)
  end

  def check_if_teacher(section_id, conn, user_id) do
    query = from u in User,
      join: e in Enrollment,
      on: u.id == e.user_id,
      where: u.id == ^user_id and e.section_id == ^section_id,
      select: e.role
    Repo.all(query)
  end

  @doc """
  Gets a single assignment.

  Raises `Ecto.NoResultsError` if the Assignment does not exist.

  ## Examples

      iex> get_assignment!(123)
      %Assignment{}

      iex> get_assignment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_assignment!(id), do: Repo.get!(Assignment, id)

  @doc """
  Creates a assignment.

  ## Examples

      iex> create_assignment(%{field: value})
      {:ok, %Assignment{}}

      iex> create_assignment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_assignment(attrs \\ %{}) do
    %Assignment{}
    |> Assignment.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a assignment.

  ## Examples

      iex> update_assignment(assignment, %{field: new_value})
      {:ok, %Assignment{}}

      iex> update_assignment(assignment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_assignment(%Assignment{} = assignment, attrs) do
    assignment
    |> Assignment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Assignment.

  ## Examples

      iex> delete_assignment(assignment)
      {:ok, %Assignment{}}

      iex> delete_assignment(assignment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_assignment(%Assignment{} = assignment) do
    Repo.delete(assignment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking assignment changes.

  ## Examples

      iex> change_assignment(assignment)
      %Ecto.Changeset{source: %Assignment{}}

  """
  def change_assignment(%Assignment{} = assignment) do
    Assignment.changeset(assignment, %{})
  end

  alias Backend.Auth.Question

  @doc """
  Returns the list of questions.

  ## Examples

      iex> list_questions()
      [%Question{}, ...]

  """
  def list_questions do
    Repo.all(Question)
  end

  @doc """
  Gets a single question.

  Raises `Ecto.NoResultsError` if the Question does not exist.

  ## Examples

      iex> get_question!(123)
      %Question{}

      iex> get_question!(456)
      ** (Ecto.NoResultsError)

  """
  def get_question!(id), do: Repo.get!(Question, id)

  @doc """
  Creates a question.

  ## Examples

      iex> create_question(%{field: value})
      {:ok, %Question{}}

      iex> create_question(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_question(attrs \\ %{}) do
    %Question{}
    |> Question.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a question.

  ## Examples

      iex> update_question(question, %{field: new_value})
      {:ok, %Question{}}

      iex> update_question(question, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_question(%Question{} = question, attrs) do
    question
    |> Question.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Question.

  ## Examples

      iex> delete_question(question)
      {:ok, %Question{}}

      iex> delete_question(question)
      {:error, %Ecto.Changeset{}}

  """
  def delete_question(%Question{} = question) do
    Repo.delete(question)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking question changes.

  ## Examples

      iex> change_question(question)
      %Ecto.Changeset{source: %Question{}}

  """
  def change_question(%Question{} = question) do
    Question.changeset(question, %{})
  end

  alias Backend.Auth.Answer

  @doc """
  Returns the list of answers.

  ## Examples

      iex> list_answers()
      [%Answer{}, ...]

  """
  def list_answers do
    Repo.all(Answer)
  end

  @doc """
  Gets a single answer.

  Raises `Ecto.NoResultsError` if the Answer does not exist.

  ## Examples

      iex> get_answer!(123)
      %Answer{}

      iex> get_answer!(456)
      ** (Ecto.NoResultsError)

  """
  def get_answer!(id), do: Repo.get!(Answer, id)

  @doc """
  Creates a answer.

  ## Examples

      iex> create_answer(%{field: value})
      {:ok, %Answer{}}

      iex> create_answer(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_answer(attrs \\ %{}) do
    %Answer{}
    |> Answer.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a answer.

  ## Examples

      iex> update_answer(answer, %{field: new_value})
      {:ok, %Answer{}}

      iex> update_answer(answer, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_answer(%Answer{} = answer, attrs) do
    answer
    |> Answer.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Answer.

  ## Examples

      iex> delete_answer(answer)
      {:ok, %Answer{}}

      iex> delete_answer(answer)
      {:error, %Ecto.Changeset{}}

  """
  def delete_answer(%Answer{} = answer) do
    Repo.delete(answer)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking answer changes.

  ## Examples

      iex> change_answer(answer)
      %Ecto.Changeset{source: %Answer{}}

  """
  def change_answer(%Answer{} = answer) do
    Answer.changeset(answer, %{})
  end

  alias Backend.Auth.Quiz

  @doc """
  Returns the list of quizzes.

  ## Examples

      iex> list_quizzes()
      [%Quiz{}, ...]

  """
  def list_quizzes do
    Repo.all(Quiz)
  end


  def get_quiz_by_assignment(assignment_id) do
    query = 
      from a in Assignment,
      where: a.id == ^assignment_id,
      join: q in Quiz,
      on: a.id == q.assignment_id,
      select: %{
                quiz_id: q.id,
                max_attempts: q.max_attempts,
                current_attempts: q.current_attempts,
                show_answers: q.show_answers,
                keep_highest: q.keep_highest
              }
    [head | tail] = Repo.all(query)
    head
  end


  def get_question_by_quiz(quiz_id) do
    query = 
      from q in Quiz,
      where: q.id == ^quiz_id,
      join: quest in Question,
      on: q.id == quest.quiz_id,
      select: %{
                question_id: quest.id,
                question: quest.question,
                a1: quest.a1,
                a2: quest.a2,
                a3: quest.a3,
                a4: quest.a4,
                a5: quest.a5,
                correct_answer: quest.correct_answer
              }
    Repo.all(query)
  end

  @doc """
  Gets a single quiz.

  Raises `Ecto.NoResultsError` if the Quiz does not exist.

  ## Examples

      iex> get_quiz!(123)
      %Quiz{}

      iex> get_quiz!(456)
      ** (Ecto.NoResultsError)

  """
  def get_quiz!(id), do: Repo.get!(Quiz, id)

  @doc """
  Creates a quiz.

  ## Examples

      iex> create_quiz(%{field: value})
      {:ok, %Quiz{}}

      iex> create_quiz(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_quiz(attrs \\ %{}) do
    %Quiz{}
    |> Quiz.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a quiz.

  ## Examples

      iex> update_quiz(quiz, %{field: new_value})
      {:ok, %Quiz{}}

      iex> update_quiz(quiz, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_quiz(%Quiz{} = quiz, attrs) do
    quiz
    |> Quiz.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Quiz.

  ## Examples

      iex> delete_quiz(quiz)
      {:ok, %Quiz{}}

      iex> delete_quiz(quiz)
      {:error, %Ecto.Changeset{}}

  """
  def delete_quiz(%Quiz{} = quiz) do
    Repo.delete(quiz)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking quiz changes.

  ## Examples

      iex> change_quiz(quiz)
      %Ecto.Changeset{source: %Quiz{}}

  """
  def change_quiz(%Quiz{} = quiz) do
    Quiz.changeset(quiz, %{})
  end

  alias Backend.Auth.Assignment_to_groupset

  @doc """
  Returns the list of assignments_to_groupsets.

  ## Examples

      iex> list_assignments_to_groupsets()
      [%Assignment_to_groupset{}, ...]

  """
  def list_assignments_to_groupsets do
    Repo.all(Assignment_to_groupset)
  end

  @doc """
  Gets a single assignment_to_groupset.

  Raises `Ecto.NoResultsError` if the Assignment to groupset does not exist.

  ## Examples

      iex> get_assignment_to_groupset!(123)
      %Assignment_to_groupset{}

      iex> get_assignment_to_groupset!(456)
      ** (Ecto.NoResultsError)

  """
  def get_assignment_to_groupset!(id), do: Repo.get!(Assignment_to_groupset, id)

  @doc """
  Creates a assignment_to_groupset.

  ## Examples

      iex> create_assignment_to_groupset(%{field: value})
      {:ok, %Assignment_to_groupset{}}

      iex> create_assignment_to_groupset(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_assignment_to_groupset(attrs \\ %{}) do
    %Assignment_to_groupset{}
    |> Assignment_to_groupset.changeset(attrs)
    |> Repo.insert()
  end

  alias Backend.Auth.Page

  @doc """
  Returns the list of pages.

  ## Examples

      iex> list_pages()
      [%Page{}, ...]

  """
  def list_pages do
    Repo.all(Page)
  end

  @doc """
  Gets a single page.

  Raises `Ecto.NoResultsError` if the Page does not exist.

  ## Examples

      iex> get_page!(123)
      %Page{}

      iex> get_page!(456)
      ** (Ecto.NoResultsError)

  """
  def get_page!(id), do: Repo.get!(Page, id)

  @doc """
  Creates a page.

  ## Examples

      iex> create_page(%{field: value})
      {:ok, %Page{}}

      iex> create_page(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_page(attrs \\ %{}) do
    %Page{}
    |> Page.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a assignment_to_groupset.

  ## Examples

      iex> update_assignment_to_groupset(assignment_to_groupset, %{field: new_value})
      {:ok, %Assignment_to_groupset{}}

      iex> update_assignment_to_groupset(assignment_to_groupset, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_assignment_to_groupset(%Assignment_to_groupset{} = assignment_to_groupset, attrs) do
    assignment_to_groupset
    |> Assignment_to_groupset.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Updates a page.

  ## Examples

      iex> update_page(page, %{field: new_value})
      {:ok, %Page{}}

      iex> update_page(page, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_page(%Page{} = page, attrs) do
    page
    |> Page.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Assignment_to_groupset.

  ## Examples

      iex> delete_assignment_to_groupset(assignment_to_groupset)
      {:ok, %Assignment_to_groupset{}}

      iex> delete_assignment_to_groupset(assignment_to_groupset)
      {:error, %Ecto.Changeset{}}

  """
  def delete_assignment_to_groupset(%Assignment_to_groupset{} = assignment_to_groupset) do
    Repo.delete(assignment_to_groupset)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking assignment_to_groupset changes.

  ## Examples

      iex> change_assignment_to_groupset(assignment_to_groupset)
      %Ecto.Changeset{source: %Assignment_to_groupset{}}

  """
  def change_assignment_to_groupset(%Assignment_to_groupset{} = assignment_to_groupset) do
    Assignment_to_groupset.changeset(assignment_to_groupset, %{})
  end

  @doc """
  Deletes a Page.

  ## Examples

      iex> delete_page(page)
      {:ok, %Page{}}

      iex> delete_page(page)
      {:error, %Ecto.Changeset{}}

  """
  def delete_page(%Page{} = page) do
    Repo.delete(page)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking page changes.

  ## Examples

      iex> change_page(page)
      %Ecto.Changeset{source: %Page{}}

  """
  def change_page(%Page{} = page) do
    Page.changeset(page, %{})
  end

  @doc """
  Returns the list of assignments_to_groups.

  ## Examples

      iex> list_assignments_to_groups()
      [%AssignmentToGroup{}, ...]

  """
  def list_assignments_to_groups do
    Repo.all(AssignmentToGroup)
  end

  @doc """
  Gets a single assignment_to_group.

  Raises `Ecto.NoResultsError` if the Assignment to group does not exist.

  ## Examples

      iex> get_assignment_to_group!(123)
      %AssignmentToGroup{}

      iex> get_assignment_to_group!(456)
      ** (Ecto.NoResultsError)

  """
  def get_assignment_to_group!(id), do: Repo.get!(AssignmentToGroup, id)

  @doc """
  Creates a assignment_to_group.

  ## Examples

      iex> create_assignment_to_group(%{field: value})
      {:ok, %AssignmentToGroup{}}

      iex> create_assignment_to_group(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_assignment_to_group(attrs \\ %{}) do
    %AssignmentToGroup{}
    |> AssignmentToGroup.changeset(attrs)
    |> Repo.insert()
  end

  def parse_bulk_user(assignment_id, [head | tail], accumulator) do
    result = [
      %{id: Ecto.UUID.generate(), assignment_id: assignment_id, user_id: head} | accumulator
    ]

    if length(tail) != 0 do
      parse_bulk_user(assignment_id, tail, result)
    else
      result
    end
  end

  def parse_bulk_group(assignment_id, [head | tail], accumulator) do
    result = [
      %{id: Ecto.UUID.generate(), assignment_id: assignment_id, group_id: head} | accumulator
    ]

    if length(tail) != 0 do
      parse_bulk_group(assignment_id, tail, result)
    else
      result
    end
  end

  def parse_bulk_questions(quiz_id, [head | tail], accumulator) do
    result = 
    if(head["question"] != "" && head["a1"] != "" && head["a2"] != "") do
      [%{id: Ecto.UUID.generate(), quiz_id: quiz_id, question: head["question"], a1: head["a1"], a2: head["a2"], a3: head["a3"], a4: head["a4"], a5: head["a5"], correct_answer: head["correct_answer"]} | accumulator]
    else
      accumulator
    end
    if length(tail) != 0 do
      parse_bulk_questions(quiz_id, tail, result)
    else
      result
    end
  end


  def parse_bulk_answers(submission_id, [head | tail], accumulator) do
    result = 
      [
        %{id: Ecto.UUID.generate(), question_id: head["question_id"], submission_id: submission_id, selected_field: head["selected_field"]} | accumulator
      ]
    if(length(tail) != 0) do
      parse_bulk_answers(submission_id, tail, result)
    else
      result
    end
  end

  @doc """
  Updates a assignment_to_group.

  ## Examples

      iex> update_assignment_to_group(assignment_to_group, %{field: new_value})
      {:ok, %AssignmentToGroup{}}

      iex> update_assignment_to_group(assignment_to_group, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_assignment_to_group(%AssignmentToGroup{} = assignment_to_group, attrs) do
    assignment_to_group
    |> AssignmentToGroup.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AssignmentToGroup.

  ## Examples

      iex> delete_assignment_to_group(assignment_to_group)
      {:ok, %AssignmentToGroup{}}

      iex> delete_assignment_to_group(assignment_to_group)
      {:error, %Ecto.Changeset{}}

  """
  def delete_assignment_to_group(%AssignmentToGroup{} = assignment_to_group) do
    Repo.delete(assignment_to_group)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking assignment_to_group changes.

  ## Examples

      iex> change_assignment_to_group(assignment_to_group)
      %Ecto.Changeset{source: %AssignmentToGroup{}}

  """
  def change_assignment_to_group(%AssignmentToGroup{} = assignment_to_group) do
    AssignmentToGroup.changeset(assignment_to_group, %{})
  end

  @doc """
  Returns the list of assignments_to_users.

  ## Examples

      iex> list_assignments_to_users()
      [%AssignmentToUser{}, ...]

  """
  def list_assignments_to_users do
    Repo.all(AssignmentToUser)
  end

  @doc """
  Gets a single assignment_to_user.

  Raises `Ecto.NoResultsError` if the Assignment to user does not exist.

  ## Examples

      iex> get_assignment_to_user!(123)
      %AssignmentToUser{}

      iex> get_assignment_to_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_assignment_to_user!(id), do: Repo.get!(AssignmentToUser, id)

  @doc """
  Creates a assignment_to_user.

  ## Examples

      iex> create_assignment_to_user(%{field: value})
      {:ok, %AssignmentToUser{}}

      iex> create_assignment_to_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_assignment_to_user(attrs \\ %{}) do
    %AssignmentToUser{}
    |> AssignmentToUser.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a assignment_to_user.

  ## Examples

      iex> update_assignment_to_user(assignment_to_user, %{field: new_value})
      {:ok, %AssignmentToUser{}}

      iex> update_assignment_to_user(assignment_to_user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_assignment_to_user(%AssignmentToUser{} = assignment_to_user, attrs) do
    assignment_to_user
    |> AssignmentToUser.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AssignmentToUser.

  ## Examples

      iex> delete_assignment_to_user(assignment_to_user)
      {:ok, %AssignmentToUser{}}

      iex> delete_assignment_to_user(assignment_to_user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_assignment_to_user(%AssignmentToUser{} = assignment_to_user) do
    Repo.delete(assignment_to_user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking assignment_to_user changes.

  ## Examples

      iex> change_assignment_to_user(assignment_to_user)
      %Ecto.Changeset{source: %AssignmentToUser{}}

  """
  def change_assignment_to_user(%AssignmentToUser{} = assignment_to_user) do
    AssignmentToUser.changeset(assignment_to_user, %{})
  end

  alias Backend.Auth.Submission

  def get_submissions_by_assignment(assignment_id) do
    query = 
      from a in Assignment,
      where: a.id == ^assignment_id,
      join: s in Submission,
      on: a.id == s.assignment_id,
      left_join: g in Grade,
      on: s.id == g.submission_id,
      left_join: u in User,
      on: u.id == s.user_id,
      select: 
      %{
          id: s.id,
          user_name: u.name, 
          user_id: s.user_id, 
          group_id: s.group_id, 
          file_id: s.file_id, 
          text_entry: s.text_entry, 
          inserted_at: s.inserted_at, 
          updated_at: s.updated_at, 
          points_possible: a.points_possible,
          points_earned: g.points_earned
        }
    Repo.all(query)
  end

  def get_submissions_by_assignment_individual(assignment_id, user_id) do
    query = 
      from a in Assignment,
      where: a.id == ^assignment_id,
      join: s in Submission,
      on: a.id == s.assignment_id,
      where: s.user_id == ^user_id,
      left_join: g in Grade,
      on: s.id == g.submission_id,
      left_join: u in User,
      on: u.id == s.user_id,
      select: 
      %{
          id: s.id,
          user_name: u.name,
          user_id: s.user_id, 
          group_id: s.group_id, 
          file_id: s.file_id, 
          text_entry: s.text_entry, 
          inserted_at: s.inserted_at, 
          updated_at: s.updated_at, 
          points_possible: a.points_possible,
          points_earned: g.points_earned
        }
    Repo.all(query)
  end

  def count_submissions_by_assignment(assignment_id) do
    query = 
      from a in Assignment,
      where: a.id == ^assignment_id,
      join: s in Submission,
      on: a.id == s.assignment_id,
      select: %{submission_count: count(s.id)}
    Repo.all(query)
  end

  def count_submissions_by_assignment(assignment_id, user_id) do
    query = 
      from a in Assignment,
      where: a.id == ^assignment_id,
      join: s in Submission,
      on: a.id == s.assignment_id,
      where: s.user_id == ^user_id,
      select: %{submission_count: count(s.id)}
    Repo.all(query)
  end

  @doc """
  Returns the list of submissions.

  ## Examples

      iex> list_submissions()
      [%Submission{}, ...]

  """
  def list_submissions do
    Repo.all(Submission)
  end

  @doc """
  Gets a single submission.

  Raises `Ecto.NoResultsError` if the Submission does not exist.

  ## Examples

      iex> get_submission!(123)
      %Submission{}

      iex> get_submission!(456)
      ** (Ecto.NoResultsError)

  """
  def get_submission!(id), do: Repo.get!(Submission, id)

  @doc """
  Creates a submission.

  ## Examples

      iex> create_submission(%{field: value})
      {:ok, %Submission{}}

      iex> create_submission(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_submission(attrs \\ %{}) do
    %Submission{}
    |> Submission.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a submission.

  ## Examples

      iex> update_submission(submission, %{field: new_value})
      {:ok, %Submission{}}

      iex> update_submission(submission, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_submission(%Submission{} = submission, attrs) do
    submission
    |> Submission.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Submission.

  ## Examples

      iex> delete_submission(submission)
      {:ok, %Submission{}}

      iex> delete_submission(submission)
      {:error, %Ecto.Changeset{}}

  """
  def delete_submission(%Submission{} = submission) do
    Repo.delete(submission)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking submission changes.

  ## Examples

      iex> change_submission(submission)
      %Ecto.Changeset{source: %Submission{}}

  """
  def change_submission(%Submission{} = submission) do
    Submission.changeset(submission, %{})
  end

  def grade_quiz(quiz_info) do
    points_per_question = quiz_info.points_possible / length(quiz_info.questions)
    calculate_sum(points_per_question, quiz_info.questions, 0)
  end

  def calculate_sum(ppq, [head | tail], sum) do
    result = 
      if(head.correct_answer == head.selected_field) do
        sum + ppq
      else
        sum
      end
    if(length(tail) > 0) do
      calculate_sum(ppq, tail, result)
    else
      result
    end
  end

  def gather_quiz_info(quiz_id, submission_id) do
    quiz = get_quiz!(quiz_id)
    questions = get_questions_and_answers(quiz_id, submission_id)
    [points_possible | _] = get_points_possible(quiz_id)
    %{quiz: quiz, questions: questions, points_possible: points_possible}
  end

  def get_questions_and_answers(quiz_id, submission_id) do
    query = 
      from q in Question,
      where: q.quiz_id == ^quiz_id,
      left_join: a in Answer,
      on: q.id == a.question_id,
      where: a.submission_id == ^submission_id,
      select: %{question_id: q.id, correct_answer: q.correct_answer, answer_id: a.id, selected_field: a.selected_field}
    Repo.all(query)
  end

  def get_points_possible(quiz_id) do
    query = 
      from q in Quiz,
      where: q.id == ^quiz_id,
      join: a in Assignment,
      on: q.assignment_id == a.id,
      select: a.points_possible
    Repo.all(query)
  end

  @doc """
  Returns the list of grades.

  ## Examples

      iex> list_grades()
      [%Grade{}, ...]

  """
  def list_grades do
    Repo.all(Grade)
  end

  @doc """
  Gets a single grade.

  Raises `Ecto.NoResultsError` if the Grade does not exist.

  ## Examples

      iex> get_grade!(123)
      %Grade{}

      iex> get_grade!(456)
      ** (Ecto.NoResultsError)

  """
  def get_grade!(id), do: Repo.get!(Grade, id)

  @doc """
  Creates a grade.

  ## Examples

      iex> create_grade(%{field: value})
      {:ok, %Grade{}}

      iex> create_grade(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_grade(attrs \\ %{}) do
    %Grade{}
    |> Grade.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a grade.

  ## Examples

      iex> update_grade(grade, %{field: new_value})
      {:ok, %Grade{}}

      iex> update_grade(grade, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_grade(%Grade{} = grade, attrs) do
    grade
    |> Grade.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Grade.

  ## Examples

      iex> delete_grade(grade)
      {:ok, %Grade{}}

      iex> delete_grade(grade)
      {:error, %Ecto.Changeset{}}

  """
  def delete_grade(%Grade{} = grade) do
    Repo.delete(grade)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking grade changes.

  ## Examples

      iex> change_grade(grade)
      %Ecto.Changeset{source: %Grade{}}

  """
  def change_grade(%Grade{} = grade) do
    Grade.changeset(grade, %{})
  end
end
