import React, { useEffect, useState } from 'react';
import { fetchMySkills, addMySkill, updateMySkill, deleteMySkill } from '../../services/skillsApi';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EditSkillModal from '../../components/EditSkillModal';
import { useToast } from '../../context/ToastContext';

const MentorSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', level: '', description: '', tags: '', hourlyRate: '' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchMySkills();
      setSkills(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] };
      await addMySkill(payload);
      setForm({ name: '', category: '', level: '', description: '', tags: '', hourlyRate: '' });
      await load();
      toast.addToast('Skill added', 'success');
    } catch (err) {
      toast.addToast(err.response?.data?.message || err.message, 'error');
    }
  };

  const [confirmingId, setConfirmingId] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const toast = useToast();

  const handleDelete = (id) => {
    setConfirmingId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteMySkill(confirmingId);
      setConfirmingId(null);
      await load();
      toast.addToast('Skill deleted', 'success');
    } catch (err) {
      toast.addToast(err.response?.data?.message || err.message, 'error');
    }
  };

  const cancelDelete = () => setConfirmingId(null);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Skills</h1>

      <div className="mb-6">
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input required placeholder="Skill name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="px-3 py-2 border rounded" />
          <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="px-3 py-2 border rounded" />
          <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} className="px-3 py-2 border rounded">
            <option value="">Select level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input placeholder="Hourly rate" value={form.hourlyRate} onChange={e => setForm({ ...form, hourlyRate: e.target.value })} className="px-3 py-2 border rounded" />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="px-3 py-2 border rounded md:col-span-2" />
          <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="px-3 py-2 border rounded md:col-span-2" />

          <div className="md:col-span-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Skill</button>
          </div>
        </form>
      </div>

      <div>
        {loading ? <LoadingSkeleton rows={4} /> : (
          <div className="space-y-3">
            {skills.map(s => (
              <div key={s._id} className="bg-white p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{s.name} <span className="text-sm text-gray-500">• {s.level}</span></div>
                  <div className="text-sm text-gray-600">{s.category} • {s.tags?.join(', ')}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingSkill(s)} className="px-3 py-1 border rounded">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {confirmingId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold">Delete skill</h3>
            <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete this skill? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={cancelDelete} className="px-3 py-1 border rounded">Cancel</button>
              <button onClick={confirmDelete} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {editingSkill && (
        <EditSkillModal
          skill={editingSkill}
          onClose={() => setEditingSkill(null)}
          onSave={async (payload) => {
            try {
              await updateMySkill(editingSkill._id, payload);
              toast.addToast('Skill updated', 'success');
              setEditingSkill(null);
              await load();
            } catch (err) {
              toast.addToast(err.response?.data?.message || err.message, 'error');
            }
          }}
        />
      )}
    </div>
  );
};

export default MentorSkills;
