const Project = require('../models/Project');
const Personal = require('../models/Personal');
const Experience = require('../models/Experience');


// --- AUTH CONTROLLERS ---
exports.login = (req, res) => {
    // If passport authenticates successfully, execution reaches here
    res.status(200).json({ success: true, message: 'Logged in successfully' });
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
};

exports.checkAuth = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ authenticated: true, user: req.user.username });
    } else {
        res.status(401).json({ authenticated: false });
    }
};

// --- PROJECT CONTROLLERS ---
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createProject = async (req, res) => {
    try {
        // req.body includes title, description, and the Supabase attachmentUrls
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(project);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// --- PERSONAL CONTROLLERS ---
// (Assuming you only ever have one document for Personal data)
exports.getPersonal = async (req, res) => {
    try {
        const personal = await Personal.findOne();
        res.status(200).json(personal);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.upsertPersonal = async (req, res) => {
    try {
        // If a document exists, update it. Otherwise, create it.
        const personal = await Personal.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(personal);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

// --- EXPERIENCE CONTROLLERS ---
exports.getExperience = async (req, res) => {
    try {
        const exp = await Experience.find().sort({ startDate: -1 });
        res.status(200).json(exp);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createExperience = async (req, res) => {
    try {
        const exp = await Experience.create(req.body);
        res.status(201).json(exp);
    } catch (err) { res.status(400).json({ error: err.message }); }
};
exports.updateExperience = async (req, res) => {
    try {
        const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(exp);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteExperience = async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Experience deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
