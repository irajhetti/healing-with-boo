import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your Healing with Boo member profile and preferences.",
};

export default function MembersProfilePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-headline text-3xl text-on-surface mb-2">Your Profile</h1>
      <p className="text-on-surface-variant mb-10">Manage your account details and healing preferences.</p>

      {/* Profile Form */}
      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 md:p-8 mb-8">
        <h2 className="font-label font-medium text-on-surface text-lg mb-6">Personal Information</h2>
        <form className="space-y-5">
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Sarah Jenkins"
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="sarah@example.com"
              disabled
              className="w-full px-4 py-3 bg-surface-container border-b-2 border-outline-variant/10 rounded-t-lg text-on-surface-variant cursor-not-allowed"
            />
            <p className="text-xs text-on-surface-variant mt-1">Contact us to change your email address.</p>
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="07700 900123"
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
          </div>
        </form>
      </section>

      {/* Preferences */}
      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 md:p-8 mb-8">
        <h2 className="font-label font-medium text-on-surface text-lg mb-6">Healing Preferences</h2>
        <form className="space-y-5">
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Massage Pressure</label>
            <select
              defaultValue="Medium"
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            >
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="Firm">Firm</option>
              <option value="Deep">Deep</option>
            </select>
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Health Notes</label>
            <textarea
              rows={4}
              defaultValue="No known allergies. Occasional lower back tension from desk work."
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface resize-none"
              placeholder="Any health conditions, injuries, or preferences we should know about..."
            />
            <p className="text-xs text-on-surface-variant mt-1">This information helps us personalise your sessions.</p>
          </div>
        </form>
      </section>

      <div className="mb-12">
        <button className="bg-primary text-on-primary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
          Save Changes
        </button>
      </div>

      {/* Change Password */}
      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 md:p-8">
        <h2 className="font-label font-medium text-on-surface text-lg mb-6">Change Password</h2>
        <form className="space-y-5">
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block font-label text-sm font-medium text-on-surface mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="button"
            className="border border-outline-variant text-on-surface font-label font-medium px-8 py-3 rounded-full hover:bg-surface-container transition-colors"
          >
            Update Password
          </button>
        </form>
      </section>
    </div>
  );
}
