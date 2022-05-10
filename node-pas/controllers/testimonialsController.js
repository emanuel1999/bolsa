const testimonialsService = require("../services/testimonialsService");
const {validationResult} = require("express-validator");
const paginationKnowLastPage = require("../helpers/paginationKnowLastPage");

const testimonialsControler = {
  list: async (req, res) => {
    try {
      let page = req.query.page ? req.query.page : 1;
      let offset;
      if (page == 1) {
        offset = 0;
      } else {
        offset = (page - 1) * 10;
      }
      const {count, rows} = await testimonialsService.list(offset);
      const lastPage = paginationKnowLastPage(count);
      let response = {
        meta: {
          status: 200,
          count: count,
          url: "/testimonials",
        },
        pagina: {
          totales: lastPage,
          actual: page,
        },
        data: rows,
      };

      if (page == 1 && lastPage > 1) {
        response.pagina.siguiente = `/testimonials?page=${page - 1 + 2}`;
      } else if (page > 1 && page < lastPage) {
        response.pagina.anterior = `/testimonials?page=${page - 1}`;
        response.pagina.siguiente = `/testimonials?page=${page - 1 + 2}`;
      } else if (page == lastPage && lastPage > 1) {
        response.pagina.anterior = `/testimonials?page=${page - 1}`;
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      let response = {
        meta: {
          status: 500,
          statusMessage: "Error server",
        },
        data: [],
      };
      res.status(500).json(response);
    }
  },
  create: async (req, res) => {
    const validation = validationResult(req);
    const errors = validation.mapped();
    if (!validation.isEmpty()) {
      let response = {
        meta: {
          status: 400,
          statusMessage: "Error del cliente",
        },
        Error: [],
      };
      if (errors.name) {
        response.Error.push(errors.name.msg);
      }
      if (errors.content) {
        response.Error.push(errors.content.msg);
      }
      res.status(400).json(response);
    } else {
      try {
        const testimonial = req.body;
        const testimonialCreated = await testimonialsService.create(
          testimonial
        );
        let response = {
          meta: {
            status: 200,
            count: testimonialCreated.length,
            url: "/testimonials",
          },
          data: testimonialCreated,
        };
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        let response = {
          meta: {
            status: 500,
            statusMessage: "Error multiple server",
          },
          data: [],
        };
        res.status(500).json(response);
      }
    }
  },
  update: async (req, res) => {
    const validation = validationResult(req);
    const errors = validation.mapped();
    try {
      const testimonialUpdating = await testimonialsService.findByPk(
        req.params.id
      );
      if (testimonialUpdating && validation.isEmpty()) {
        const countRowUpdate = await testimonialsService.update(
          req.body,
          req.params.id
        );
        const testimonialUpdate = await testimonialsService.findByPk(
          req.params.id
        );
        let response = {
          meta: {
            status: 200,
            countRowsUpdate: countRowUpdate,
            url: "/testimonials/id",
          },
          data: testimonialUpdate,
        };
        res.status(200).json(response);
      } else if (testimonialUpdating == null) {
        let response = {
          meta: {
            status: 400,
            statusMessage: "Error del cliente",
          },
          Error: "No existe el testimonio que se quiere actualizar",
        };
        res.status(400).json(response);
      } else {
        let response = {
          meta: {
            status: 400,
            statusMessage: "Error del cliente",
          },
          Error: [],
        };
        if (errors.name) {
          response.Error.push(errors.name.msg);
        }
        if (errors.content) {
          response.Error.push(errors.content.msg);
        }
        res.status(400).json(response);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const countRowDestroy = await testimonialsService.destroy(req.params.id);
      let response = {
        status: 200,
        countRowsDelete: countRowDestroy,
        url: "/testimonials/id",
      };
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
};
module.exports = testimonialsControler;
