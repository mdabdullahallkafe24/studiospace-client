
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  ShieldCheck,
  ShieldAlert,
  CalendarDays,
  ArrowLeft,
  LayoutDashboard,
  Phone,
  MapPin,
  FileText,
  Camera,
  Save,
  LoaderCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getProfile, updateProfile } from "@/lib/api";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    city: "",
    bio: "",
    createdAt: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();

        setProfile({
          name: data.name || user.name || "",
          email: data.email || user.email || "",
          image: data.image || user.image || "",
          phone: data.phone || "",
          city: data.city || "",
          bio: data.bio || "",
          createdAt: data.createdAt || user.createdAt || null,
        });
      } catch (error) {
        toast.error(error.message || "Failed to load profile.");

        setProfile({
          name: user.name || "",
          email: user.email || "",
          image: user.image || "",
          phone: "",
          city: "",
          bio: "",
          createdAt: user.createdAt || null,
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (isPending || !user || loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle
          size={35}
          className="animate-spin text-[#C66B45]"
        />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      setSaving(true);

      const updated = await updateProfile({
        name: profile.name,
        image: profile.image,
        phone: profile.phone,
        city: profile.city,
        bio: profile.bio,
      });

      setProfile((previous) => ({
        ...previous,
        ...updated,
      }));

      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const joinedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#555] hover:text-[#C66B45]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#C66B45]">
            My Account
          </p>

          <h1 className="text-3xl font-bold text-[#252724] md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-[#777]">
            View and manage your personal information and account details.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#E9E6DE] bg-white shadow-sm">

          <div className="bg-[#F0EEE8] px-6 py-10 text-center">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name || "Profile"}
                className="mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#C66B45] text-white shadow-md">
                <User size={45} />
              </div>
            )}

            <h2 className="mt-5 text-2xl font-bold text-[#252724]">
              {profile.name || "User"}
            </h2>

            <p className="mt-1 text-sm text-[#777]">
              {profile.email}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#697B63]">
              <ShieldCheck size={15} />
              StudioSpace Member
            </span>
          </div>

          <div className="p-6 md:p-8">

            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold text-[#252724]">
                  Account Information
                </h3>
                <p className="mt-1 text-sm text-[#777970]">
                  Manage your personal details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="rounded-xl bg-[#252724] px-5 py-3 text-sm font-medium text-white hover:bg-[#3c403a]"
              >
                {editMode ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#252724]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-[#E9E6DE] bg-[#FAF9F6] px-4 py-3 text-sm outline-none focus:border-[#C66B45]"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#252724]">
                    Profile Image URL
                  </label>
                  <div className="relative">
                    <Camera
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C66B45]"
                    />
                    <input
                      type="url"
                      name="image"
                      value={profile.image}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#E9E6DE] bg-[#FAF9F6] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#C66B45]"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#252724]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-[#E9E6DE] bg-gray-100 px-4 py-3 text-sm text-gray-500"
                  />
                  <p className="mt-1 text-xs text-[#777970]">
                    Email is managed by your authentication account.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#252724]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#E9E6DE] bg-[#FAF9F6] px-4 py-3 text-sm outline-none focus:border-[#C66B45]"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#252724]">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#E9E6DE] bg-[#FAF9F6] px-4 py-3 text-sm outline-none focus:border-[#C66B45]"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#252724]">
                    About Me
                  </label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    maxLength={500}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-[#E9E6DE] bg-[#FAF9F6] px-4 py-3 text-sm outline-none focus:border-[#C66B45]"
                    placeholder="Tell us a little about yourself..."
                  />
                  <p className="mt-1 text-right text-xs text-[#777970]">
                    {profile.bio.length}/500
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C66B45] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#ad5937] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">

                  <div className="rounded-2xl border border-[#E9E6DE] p-5">
                    <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                      <User size={19} />
                      <span className="text-sm font-semibold">Full Name</span>
                    </div>
                    <p className="break-words font-medium text-[#252724]">
                      {profile.name || "Not available"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E9E6DE] p-5">
                    <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                      <Mail size={19} />
                      <span className="text-sm font-semibold">Email Address</span>
                    </div>
                    <p className="break-words font-medium text-[#252724]">
                      {profile.email}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E9E6DE] p-5">
                    <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                      <Phone size={19} />
                      <span className="text-sm font-semibold">Phone Number</span>
                    </div>
                    <p className="break-words font-medium text-[#252724]">
                      {profile.phone || "Not added"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E9E6DE] p-5">
                    <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                      <MapPin size={19} />
                      <span className="text-sm font-semibold">City</span>
                    </div>
                    <p className="break-words font-medium text-[#252724]">
                      {profile.city || "Not added"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E9E6DE] p-5">
                    <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                      {user.emailVerified ? (
                        <ShieldCheck size={19} />
                      ) : (
                        <ShieldAlert size={19} />
                      )}
                      <span className="text-sm font-semibold">
                        Email Verification
                      </span>
                    </div>
                    <p className={`font-semibold ${
                      user.emailVerified ? "text-[#697B63]" : "text-amber-600"
                    }`}>
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E9E6DE] p-5">
                    <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                      <CalendarDays size={19} />
                      <span className="text-sm font-semibold">Member Since</span>
                    </div>
                    <p className="font-medium text-[#252724]">
                      {joinedDate}
                    </p>
                  </div>

                </div>

                <div className="mt-5 rounded-2xl border border-[#E9E6DE] p-5">
                  <div className="mb-3 flex items-center gap-2 text-[#C66B45]">
                    <FileText size={19} />
                    <span className="text-sm font-semibold">About Me</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#555]">
                    {profile.bio || "No bio added yet."}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-[#E9E6DE] p-5">
                  <p className="mb-2 text-sm font-semibold text-[#C66B45]">
                    Account ID
                  </p>
                  <p className="break-all font-mono text-sm text-[#555]">
                    {user.id}
                  </p>
                </div>
              </>
            )}

            <Link
              href="/dashboard"
              className="btn mt-8 w-full rounded-xl border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
            >
              <LayoutDashboard size={18} />
              Go to Dashboard
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
