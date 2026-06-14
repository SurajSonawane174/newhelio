const express = require('express');
const passport = require('passport');
const router = express.Router();
const ctrl = require('../controllers/portfolioController');

// Custom Protection Middleware
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized access. Admin only.' });
};

// --- Auth Routes ---
router.post('/login', passport.authenticate('local'), ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/check-auth', ctrl.checkAuth);

// --- Public Routes (Anyone can view) ---
router.get('/projects', ctrl.getProjects);
router.get('/personal', ctrl.getPersonal);
router.get('/experience', ctrl.getExperience);

// --- Protected Routes (Admin only) ---
// Projects
router.post('/projects', isAuthenticated, ctrl.createProject);
router.put('/projects/:id', isAuthenticated, ctrl.updateProject);
router.delete('/projects/:id', isAuthenticated, ctrl.deleteProject);

// Personal
router.post('/personal', isAuthenticated, ctrl.upsertPersonal); // Acts as create/update

// Experience
router.post('/experience', isAuthenticated, ctrl.createExperience);
router.put('/experience/:id', isAuthenticated, ctrl.updateExperience);
router.delete('/experience/:id', isAuthenticated, ctrl.deleteExperience);
// You can easily add PUT and DELETE for experience following the project pattern

module.exports = router;